export interface StateActions {
  onEnter?: () => void
  onExit?: () => void
}

export interface Transition<S extends string> {
  target: S
}

export interface StateDefinition<S extends string, E extends string> {
  actions?: StateActions
  transitions: { [key in E]?: Transition<S> }
}

export interface StateMachineDefinition<S extends string, E extends string> {
  initialState: S
  states: { [key in S]: StateDefinition<S, E> }
}

export interface StateMachine<S extends string, E extends string> {
  value: S
  transition: (event: E) => S | undefined
  subscribe: (onStoreChange: () => void) => () => void
}

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
