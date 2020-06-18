import Store from "./store";

const exampleReducers = {
  user: (state = { username: "John" }, action: any) => {
    switch (action.type) {
      case 'SET_USERNAME': return { ...state, username: action.payload.name }
      default: return state
    }
  },
  shoppingCart: (state = { items: [] }, action: any) => {
    switch (action.type) {
      case 'ADD_ITEM_TO_CART': return { ...state, items: [...state.items, action.payload.newItem] }
      default: return state
    }
  }
};

interface State {
  user: {
    username: string;
  };
  shoppingCart: {
    items: string[];
  }
}

// @ts-ignore
const store = new Store(exampleReducers);
console.log(store.getState()) // Initial state
store.subscribe((state: any) => console.log(JSON.stringify(state))) // Runs `console.log(latestState)` on state change
store.dispatch({ type: 'SET_USERNAME', payload: { name: 'Luciano' } })
store.dispatch({ type: 'ADD_ITEM_TO_CART', payload: { newItem: 'The new item' } })
