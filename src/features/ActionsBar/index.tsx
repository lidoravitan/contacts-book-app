import styled from '@emotion/styled'
import { AddContactButton } from './AddContact'
import { RefreshContacts } from './RefreshContacts'
import { Flex } from 'antd'

const StyledActionsBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--secondary);
  color: var(--natural-0);
`

export function ActionsBar() {
  return (
    <StyledActionsBar>
      <div>Filters</div>
      <Flex gap="var(--space-md)">
        <AddContactButton />
        <RefreshContacts />
      </Flex>
    </StyledActionsBar>
  )
}
