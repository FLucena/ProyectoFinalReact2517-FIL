import { useReducer, useCallback } from 'react';

const initialState = {
  items: [],
  isOpen: false
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, price: action.payload.price || 29.99 }]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
}

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: 'TOGGLE_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const total = state.items.reduce((sum, item) => sum + (item.price || 0), 0);

  return {
    items: state.items,
    isOpen: state.isOpen,
    addToCart,
    removeFromCart,
    toggleCart,
    closeCart,
    total,
    itemCount: state.items.length
  };
}; 