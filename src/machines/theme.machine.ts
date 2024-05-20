import { createMachine } from '../simple-fsm'

export enum ThemeState {
  DARK = 'dark',
  LIGHT = 'light',
}

type Events = 'toggle'

export const themeMachine = createMachine<ThemeState, Events>({
  initialState: ThemeState.DARK,
  states: {
    [ThemeState.DARK]: {
      transitions: {
        toggle: {
          target: ThemeState.LIGHT,
        },
      },
    },
    [ThemeState.LIGHT]: {
      transitions: {
        toggle: {
          target: ThemeState.DARK,
        },
      },
    },
  },
})
