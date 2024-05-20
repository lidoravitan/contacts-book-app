import { Button } from 'antd'
import { Contact } from '../../commons/types'
import { editContactMachine } from '../../machines/toggle.machine'
import { useMachineTransition } from '../../simple-fsm'
import { setEditeContact } from '../../store/slices/editContactSlice'
import { useAppDispatch } from '../../store/hooks'

type Props = {
  contact: Contact
}

export function EditContactButton({ contact }: Props) {
  const dispatch = useAppDispatch()
  const transition = useMachineTransition(editContactMachine)
  return (
    <Button
      size="small"
      onClick={() => {
        dispatch(setEditeContact(contact))
        transition('toggle')
      }}
    >
      Edit
    </Button>
  )
}
