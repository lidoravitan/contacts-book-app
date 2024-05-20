import { Space, TableProps } from 'antd'
import { Contact } from '../../commons/types'
import { EditContactButton } from './EditContactButton'
import { DeleteContactButton } from './DeleteContactButton'

export const columns: TableProps<Contact>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EditContactButton contact={record} />
        <DeleteContactButton contact={record} />
      </Space>
    ),
  },
]
