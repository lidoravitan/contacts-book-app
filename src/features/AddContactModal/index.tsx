import { Modal } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import { FormInput } from '../../commons/components/FormInput'
import { Form } from '../../commons/components/FormProvider'
import { Contact } from '../../commons/types'
import { ToggleStates, addContactMachine } from '../../machines/toggle.machine'
import { useMachineSelector, useMachineTransition } from '../../simple-fsm'
import { useAddContactMutation } from '../../store/api'

export function AddContactModal() {
  const machineState = useMachineSelector(addContactMachine)
  const transition = useMachineTransition(addContactMachine)
  const methods = useForm<Contact>()
  const [mutate] = useAddContactMutation()

  useEffect(() => {
    if (machineState === ToggleStates.ON) {
      methods.reset()
    }
  }, [machineState, methods])

  const handleSubmit = async (data: Contact) => {
    transition('toggle')
    await mutate({ ...data, id: uuid() })
  }

  return (
    <Modal
      open={machineState === ToggleStates.ON}
      onOk={methods.handleSubmit(handleSubmit)}
      onCancel={() => transition('toggle')}
      title="Add New Contact"
      okText="Save"
    >
      <Form methods={methods}>
        <FormInput name="name" placeholder="Full Name" />
        <FormInput name="address" placeholder="Address" />
        <FormInput name="phone" placeholder="Phone" />
        <FormInput name="emaiil" placeholder="Email" />
      </Form>
    </Modal>
  )
}
