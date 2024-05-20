import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { ThemeState, themeMachine } from '../../machines/theme.machine'
import { useMachineSelector, useMachineTransition } from '../../simple-fsm'
import { Switch, Typography } from 'antd'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  background-color: var(--primary);
`

export function Header() {
  const machineState = useMachineSelector(themeMachine)
  const transition = useMachineTransition(themeMachine)
  return (
    <StyledHeader>
      <Typography.Title>Contacts Book</Typography.Title>
      <Switch
        onChange={() => transition('toggle')}
        unCheckedChildren={<SunOutlined />}
        checkedChildren={<MoonOutlined />}
        defaultChecked
        checked={machineState === ThemeState.DARK}
      />
    </StyledHeader>
  )
}
