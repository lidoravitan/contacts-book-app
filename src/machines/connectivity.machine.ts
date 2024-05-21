import { createMachine } from '../simple-fsm'

const STORAGE_KEY = 'connectivity'

const getConnectivity = () => {
  let connectivity = localStorage.getItem(STORAGE_KEY)
  if (connectivity === null) localStorage.setItem(STORAGE_KEY, ConnectivityStates.CONNECTED)
  return localStorage.getItem(STORAGE_KEY) as ConnectivityStates
}

export enum ConnectivityStates {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

type Events = 'switch'

export const connectivityMachine = createMachine<ConnectivityStates, Events>({
  initialState: getConnectivity(),
  states: {
    [ConnectivityStates.CONNECTED]: {
      actions: {
        onEnter: () => {
          localStorage.setItem(STORAGE_KEY, ConnectivityStates.CONNECTED)
        },
      },
      transitions: {
        switch: {
          target: ConnectivityStates.DISCONNECTED,
        },
      },
    },
    [ConnectivityStates.DISCONNECTED]: {
      actions: {
        onEnter: () => {
          localStorage.setItem(STORAGE_KEY, ConnectivityStates.DISCONNECTED)
        },
      },
      transitions: {
        switch: {
          target: ConnectivityStates.CONNECTED,
        },
      },
    },
  },
})
