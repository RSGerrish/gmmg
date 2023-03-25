import { createContext, useReducer } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      console.log(action.payload, 'items');
      return {
        cart: action.payload
      }
    case 'ADD_ITEM':
      console.log(action.payload, 'item to add');
      console.log(state.cart, 'previous cart items');
      return {
        cart: [...state.cart, action.payload]
      }
    case 'EDIT_ITEM':
      console.log(action.payload, 'payload object');
      console.log(state.cart, 'previous cart items');

      return {
        cart: action.payload
      }
    case 'DELETE_ITEM':
      return {
        cart: state.cart.filter(item => item._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: null
  })

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CartContext.Provider>
  )
}