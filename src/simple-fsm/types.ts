export interface StateActions {
  onEnter: () => void
  onExit: () => void
}

export interface Transition<S extends string> {
  target: S
  action?: () => void
}

export interface StateDefinition<S extends string, E extends string> {
  actions?: StateActions
  transitions: { [key in E]: Transition<S> }
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
