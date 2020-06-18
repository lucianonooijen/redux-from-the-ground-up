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

describe('Store', () => {
    it('should work', () => {
        // @ts-ignore
        const store = new Store<State>(exampleReducers);

        // User
        expect(store.getState().user.username).not.toEqual('Luciano')
        store.dispatch({ type: 'SET_USERNAME', payload: { name: 'Luciano' } })
        expect(store.getState().user.username).toEqual('Luciano')

        // Cart
        expect(store.getState().shoppingCart.items.length).toBe(0);
        store.dispatch({ type: 'ADD_ITEM_TO_CART', payload: { newItem: 'The new item' } })
        expect(store.getState().shoppingCart.items.length).toBe(1);
        expect(store.getState().shoppingCart.items[0]).toEqual('The new item');
    })
})

// console.log(store.getState()) // Initial state
// store.subscribe(console.log) // Runs `console.log(latestState)` on state change
