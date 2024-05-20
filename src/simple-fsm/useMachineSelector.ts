import { useSyncExternalStore } from 'react'
import { StateMachine } from './types'

export function useMachineSelector<S extends string, E extends string>(machine: StateMachine<S, E>) {
  // @see — https://github.com/reactwg/react-18/discussions/86
  const snapshot = useSyncExternalStore(
    machine.subscribe,
    () => machine.value,
    () => machine.value, // Optional: Provide a fallback value in case of server-side rendering
  )

  return snapshot
}
