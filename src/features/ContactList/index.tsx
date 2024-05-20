import { Table } from 'antd'
import { GetContactStates, getContactsMachine } from '../../machines/getContacts.machine'
import { useMachineSelector } from '../../simple-fsm'
import { ErrorBanner } from './ErrorBanner'
import { columns } from './columns'
import { useContactList } from './hooks'

export function ContactList() {
  const { data } = useContactList()
  const machineState = useMachineSelector(getContactsMachine)

  return (
    <>
      <ErrorBanner />
      <Table
        columns={columns}
        dataSource={machineState === GetContactStates.SUCCESS ? data : []}
        rowKey="id"
        loading={machineState === GetContactStates.FETCHING}
      />
    </>
  )
}
