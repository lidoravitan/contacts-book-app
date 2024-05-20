import { createMachine } from '../simple-fsm'

export enum ToggleStates {
  ON = 'on',
  OFF = 'off',
}

type Events = 'toggle'

export const createToggleMachine = () =>
  createMachine<ToggleStates, Events>({
    initialState: ToggleStates.OFF,
    states: {
      [ToggleStates.OFF]: {
        transitions: {
          toggle: {
            target: ToggleStates.ON,
          },
        },
      },
      [ToggleStates.ON]: {
        transitions: {
          toggle: {
            target: ToggleStates.OFF,
          },
        },
      },
    },
  })

export const addContactMachine = createToggleMachine()
export const editContactMachine = createToggleMachine()
