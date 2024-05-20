import { describe, it, beforeEach, expect, vi } from 'vitest'
import { StateMachineDefinition } from '../createMachine'
import { createMachine } from '../index'

export enum RequestStates {
  INIT = 'INIT',
  FETCH = 'FETCH',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type Events = 'fetch' | 'resolve' | 'reject'

const defentition: StateMachineDefinition<RequestStates, Events> = {
  initialState: RequestStates.INIT,
  states: {
    [RequestStates.INIT]: {
      transitions: {
        fetch: {
          target: RequestStates.FETCH,
        },
      },
    },
    [RequestStates.FETCH]: {
      transitions: {
        resolve: {
          target: RequestStates.SUCCESS,
        },
        reject: {
          target: RequestStates.FAILURE,
        },
      },
    },
    [RequestStates.SUCCESS]: {
      transitions: {
        fetch: {
          target: RequestStates.FETCH,
        },
      },
    },
    [RequestStates.FAILURE]: {
      transitions: {
        fetch: {
          target: RequestStates.FETCH,
        },
      },
    },
  },
}

describe('simple finite state machine', () => {
  let machine: ReturnType<typeof createMachine<RequestStates, Events>>
  beforeEach(() => {
    machine = createMachine(defentition)
  })

  it('should initialize the machine correctly', () => {
    expect(machine.value).toBe(RequestStates.INIT)
  })

  it('should transition to the correct state on valid event types', () => {
    machine.transition('fetch')
    expect(machine.value).toBe(RequestStates.FETCH)
    machine.transition('resolve')
    expect(machine.value).toBe(RequestStates.SUCCESS)
    machine.transition('fetch')
    expect(machine.value).toBe(RequestStates.FETCH)
    machine.transition('reject')
    expect(machine.value).toBe(RequestStates.FAILURE)
    machine.transition('fetch')
    expect(machine.value).toBe(RequestStates.FETCH)
  })

  it('should return the new state after a transition', () => {
    const result = machine.transition('fetch')
    expect(result).toBe(RequestStates.FETCH)
  })

  it('should not transition on invalid event types', () => {
    const logSpy = vi.spyOn(console, 'warn')
    const result = machine.transition('reject')
    expect(result).toBe(RequestStates.INIT)
    expect(logSpy).toHaveBeenCalledWith(
      `It appears that the transition with [reject] does not exist in the state definition for "${RequestStates.INIT}".`,
    )
  })

  it('should invoke onEnter and onExit callbacks', () => {
    const onEnter = vi.fn()
    const onExit = vi.fn()
    machine = createMachine({
      ...defentition,
      states: {
        ...defentition.states,
        [RequestStates.FETCH]: {
          actions: {
            onEnter,
            onExit,
          },
          transitions: {
            resolve: {
              target: RequestStates.SUCCESS,
            },
            reject: {
              target: RequestStates.FAILURE,
            },
          },
        },
      },
    })

    machine.transition('fetch')
    expect(onEnter).toHaveBeenCalled()

    machine.transition('resolve')
    expect(onExit).toHaveBeenCalled()
  })
})
