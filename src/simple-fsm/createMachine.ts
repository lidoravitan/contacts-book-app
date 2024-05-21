import { StateMachine, StateMachineDefinition } from './types'

export function createMachine<S extends string, E extends string>(
  stateMachineDefinition: StateMachineDefinition<S, E>,
): StateMachine<S, E> & { value: Readonly<S> } {
  const subscribers: (() => void)[] = [] // Maintain a list of subscribers

  const machine: StateMachine<S, E> = {
    value: stateMachineDefinition.initialState,
    transition(event) {
      const currentState = machine.value
      const currentStateDefinition = stateMachineDefinition.states[currentState]

      const destinationTransition = currentStateDefinition.transitions[event]

      if (!destinationTransition) {
        console.warn(
          `It appears that the transition with [${event}] does not exist in the state definition for "${currentState}".`,
        )
        return machine.value
      }
      const destinationState = destinationTransition.target

      const destinationStateDefinition = stateMachineDefinition.states[destinationState]

      if (destinationStateDefinition.actions?.onEnter) {
        destinationStateDefinition.actions.onEnter()
      }

      if (currentStateDefinition.actions?.onExit) {
        currentStateDefinition.actions.onExit()
      }

      machine.value = destinationState

      subscribers.forEach((subscriber) => subscriber())

      return machine.value
    },
    subscribe(onStoreChange: () => void) {
      subscribers.push(onStoreChange)

      return () => {
        const index = subscribers.indexOf(onStoreChange)
        if (index !== -1) {
          subscribers.splice(index, 1)
        }
      }
    },
  }
  return machine
}
