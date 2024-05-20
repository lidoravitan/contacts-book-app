import { DisconnectOutlined, WifiOutlined } from '@ant-design/icons'
import { Alert, Switch } from 'antd'
import { ConnectivityStates, connectivityMachine } from '../../machines/connectivity.machine'
import { useMachineSelector, useMachineTransition } from '../../simple-fsm'

export function ConnectivityBanner() {
  const connectivity = useMachineSelector(connectivityMachine) === ConnectivityStates.CONNECTED
  const transition = useMachineTransition(connectivityMachine)
  return (
    <Alert
      message={`Toggle this switch to demonstrate failure handling. [Status: ${connectivity ? 'Success' : 'Failure'}]`}
      type={connectivity ? 'success' : 'error'}
      showIcon
      banner
      action={
        <Switch
          onChange={() => {
            transition('switch')
          }}
          unCheckedChildren={<DisconnectOutlined />}
          checkedChildren={<WifiOutlined />}
          checked={connectivity}
        />
      }
    />
  )
}
