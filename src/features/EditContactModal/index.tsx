import { Modal } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '../../commons/components/FormInput'
import { Form } from '../../commons/components/FormProvider'
import { Contact } from '../../commons/types'
import { ToggleStates, editContactMachine } from '../../machines/toggle.machine'
import { useMachineSelector, useMachineTransition } from '../../simple-fsm'
import { useUpdateContactMutation } from '../../store/api'
import { useAppSelector } from '../../store/hooks'

export function EditContactModal() {
  const machineState = useMachineSelector(editContactMachine)
  const transition = useMachineTransition(editContactMachine)
  const contact = useAppSelector((state) => state.editContact.contact)
  const methods = useForm<Contact>()
  const [mutate, { isLoading }] = useUpdateContactMutation()

  const handleSubmit = async (data: Contact) => {
    await mutate(data)
    transition('toggle')
  }

  useEffect(() => {
    methods.reset(contact)
  }, [contact, methods])

  return (
    <>
      <Modal
        open={machineState === ToggleStates.ON}
        onOk={methods.handleSubmit(handleSubmit)}
        onCancel={() => transition('toggle')}
        title="Edit Contact"
        okText="Save"
        confirmLoading={isLoading}
      >
        <Form methods={methods}>
          <FormInput name="name" placeholder="Full Name" />
          <FormInput name="address" placeholder="Address" />
          <FormInput name="phone" placeholder="Phone" />
          <FormInput name="emaiil" placeholder="Email" />
        </Form>
      </Modal>
    </>
  )
}
