export default interface Store<S> {
state: S;
  getState: () => S;
  dispatch: (action: Action<any>) => void;
  subscribe: (listener: Listener<S>) => void;
}

export type Listener<S> = (state: S) => void

export interface Action<T> {
  type: string;
  payload: T;
}

export type Reducer<S, A extends Action<S>> = (
  state: S | undefined,
  action: A
) => S

export type Reducers<S> = Record<string, Reducer<S, any>>

type AnyAction = Action<any>

export interface Dispatch<A extends AnyAction> {
  <T extends A>(action: T): T
}

export type CreateStore<S> = (reducers: Reducers<S>) => Store<S>;
