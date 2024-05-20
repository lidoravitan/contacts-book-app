import { Alert, Button } from 'antd'
import { GetContactStates, getContactsMachine } from '../../machines/getContacts.machine'
import { useMachineSelector } from '../../simple-fsm'
import { useContactList } from './hooks'

export function ErrorBanner() {
  const machineState = useMachineSelector(getContactsMachine)
  const { refetch } = useContactList({ skip: true })

  return machineState === GetContactStates.ERROR ? (
    <Alert
      banner
      type="error"
      message="Couldn't load contacts [Demonstrate machine state error]"
      action={
        <Button size="small" onClick={() => refetch()}>
          Try Again
        </Button>
      }
    />
  ) : null
}
