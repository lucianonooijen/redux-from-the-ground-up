import { Listener, Action, Reducer, Reducers, Dispatch, CreateStore } from "./types";

class Store<State> {
  private state: State;
  private storeListeners: Listener<State>[] = [];
  private reducers: Reducers<State>;

  constructor(reducers: Reducers<State>) {
    this.reducers = reducers;
    const initialState = Object
      .keys(reducers)
      .reduce((acc, key) => (
        {
          ...acc,
          [key]: reducers[key](undefined, { type: '__INIT__' }),
        }
      ), {}) as any
    this.state = initialState
  }

  public getState(): State {
    return this.state
  }
  private setState(state: State) {
    this.state = state
  }

  public sendNewStoreToListeners() {
    if (this.storeListeners.length > 0) {
      this.storeListeners.forEach(listener => listener(this.getState()))
    }
  }

  public dispatch<T>(action: Action<T>) {
    Object.keys(this.reducers).forEach((reducerName: string) => {
      this.setState({
        ...this.getState(),
        // @ts-ignore
        [reducerName]: this.reducers[reducerName](this.getState()[reducerName], action)
      })
    });
    this.sendNewStoreToListeners()
  }

  public subscribe(callback: Listener<any>) {
    this.storeListeners.push(callback)
  }
}

export default Store;
