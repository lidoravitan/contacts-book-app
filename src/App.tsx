import { AppProviders } from './AppProviders'
import { ActionsBar } from './features/ActionsBar'
import { AddContactModal } from './features/AddContactModal'
import { ContactList } from './features/ContactList'
import { EditContactModal } from './features/EditContactModal'
import { Header } from './features/Header'

export function App() {
  return (
    <AppProviders>
      <Header />
      <ActionsBar />
      <ContactList />
      <AddContactModal />
      <EditContactModal />
    </AppProviders>
  )
}
