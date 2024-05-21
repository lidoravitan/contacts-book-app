import { RetweetOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useGetContactsQuery } from '../../store/api'

export function RefreshContacts() {
  const { refetch } = useGetContactsQuery()
  return (
    <Button type="primary" onClick={() => refetch()}>
      <RetweetOutlined /> Refresh Contacts
    </Button>
  )
}
