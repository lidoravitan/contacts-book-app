import { Button } from 'antd'
import { Contact } from '../../commons/types'
import { useDeleteContactMutation } from '../../store/api'

type Props = {
  contact: Contact
}

export function DeleteContactButton({ contact }: Props) {
  const [mutate] = useDeleteContactMutation()
  return (
    <Button
      danger
      size="small"
      onClick={() => {
        mutate(contact.id)
      }}
    >
      Delete
    </Button>
  )
}
