import { createMachine } from '../simple-fsm'

export enum GetContactStates {
  INIT = 'INIT',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Events = 'fetch' | 'resolve' | 'reject'

export const getContactsMachine = createMachine<GetContactStates, Events>({
  initialState: GetContactStates.INIT,
  states: {
    [GetContactStates.INIT]: {
      transitions: {
        fetch: {
          target: GetContactStates.FETCHING,
        },
      },
    },
    [GetContactStates.FETCHING]: {
      transitions: {
        fetch: {
          target: GetContactStates.FETCHING,
        },
        resolve: {
          target: GetContactStates.SUCCESS,
        },
        reject: {
          target: GetContactStates.ERROR,
        },
      },
    },
    [GetContactStates.SUCCESS]: {
      transitions: {
        fetch: {
          target: GetContactStates.FETCHING,
        },
        resolve: {
          target: GetContactStates.SUCCESS,
        },
      },
    },
    [GetContactStates.ERROR]: {
      transitions: {
        fetch: {
          target: GetContactStates.FETCHING,
        },
        reject: {
          target: GetContactStates.ERROR,
        },
      },
    },
  },
})

// FINIT STATE MACHINE TABLE
// +----------------+----------------+----------------+
// |    Input       | Current State  | Next State     |
// +----------------+----------------+----------------+
// | fetch          | INIT           |    FETCHING    |
// +----------------+----------------+----------------+
// | fetch          | SUCCESS        |    FETCHING    |
// +----------------+----------------+----------------+
// | fetch          | ERROR          |    FETCHING    |
// +----------------+----------------+----------------+
// | resolve        | FETCHING       |    SUCCESS     |
// +----------------+----------------+----------------+
// | reject         | FETCHING       |    ERROR       |
// +----------------+----------------+----------------+
