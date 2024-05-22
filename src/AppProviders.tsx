import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './commons/components/ThemeProvider'
import { ConnectivityBanner } from './features/ConnectivityBanner'
import { createstore } from './store'

export function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={createstore()}>
        <ToastContainer position="bottom-left" />
        <ConnectivityBanner />
        {children}
      </Provider>
    </ThemeProvider>
  )
}
