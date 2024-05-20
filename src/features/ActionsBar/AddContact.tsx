import { Button } from 'antd'
import { addContactMachine } from '../../machines/toggle.machine'
import { useMachineTransition } from '../../simple-fsm'
import { UserAddOutlined } from '@ant-design/icons'

export function AddContactButton() {
  const transition = useMachineTransition(addContactMachine)
  return (
    <Button type="primary" onClick={() => transition('toggle')}>
      <UserAddOutlined /> Add Contact
    </Button>
  )
}
