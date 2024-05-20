import { StateMachine } from './types'

export function useMachineTransition<S extends string, E extends string>(machine: StateMachine<S, E>) {
  return machine.transition
}
