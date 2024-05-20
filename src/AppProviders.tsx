import { Provider } from 'react-redux'
import { ThemeProvider } from './commons/components/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import { store } from './store'
import 'react-toastify/dist/ReactToastify.css'
import { ConnectivityBanner } from './features/ConnectivityBanner'

export function AppProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <ToastContainer position="bottom-left" />
        <ConnectivityBanner />
        {children}
      </Provider>
    </ThemeProvider>
  )
}
