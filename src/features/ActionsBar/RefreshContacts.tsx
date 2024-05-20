import { RetweetOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useContactList } from '../ContactList/hooks'

export function RefreshContacts() {
  const { refetch } = useContactList({ skip: true })
  return (
    <Button type="primary" onClick={() => refetch()}>
      <RetweetOutlined /> Refresh Contacts
    </Button>
  )
}
