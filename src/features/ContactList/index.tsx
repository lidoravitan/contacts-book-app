import { Table } from 'antd'
import { GetContactStates, getContactsMachine } from '../../machines/getContacts.machine'
import { useMachineSelector } from '../../simple-fsm'
import { useGetContactsQuery } from '../../store/api'
import { ErrorBanner } from './ErrorBanner'
import { columns } from './columns'

export function ContactList() {
  const { data } = useGetContactsQuery()
  const machineState = useMachineSelector(getContactsMachine)

  return (
    <>
      <ErrorBanner />
      <Table columns={columns} dataSource={data} rowKey="id" loading={machineState === GetContactStates.FETCHING} />
    </>
  )
}
