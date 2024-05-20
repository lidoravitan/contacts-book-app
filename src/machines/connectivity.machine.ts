import { createMachine } from '../simple-fsm'

const getConnectivity = () => {
  const connectivity = localStorage.getItem('connectivity')
  if (connectivity === null) localStorage.setItem('connectivity', ConnectivityStates.CONNECTED)
  return localStorage.getItem('connectivity') as ConnectivityStates
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
          localStorage.setItem('connectivity', ConnectivityStates.CONNECTED)
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
          localStorage.setItem('connectivity', ConnectivityStates.DISCONNECTED)
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
