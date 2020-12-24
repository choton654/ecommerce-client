export const initialState = {
  cart: {},
  orders: [],
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "PLACE_ORDER":
      return {
        ...state,
        orders: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "ADD_ADDRESS":
      return {
        ...state,
        orders: action.payload,
      };
    case "CART_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: {},
      };
    case "EDIT_ORDER":
      return {
        ...state,
        orders:state.orders.map((order)=> { if (order._id.toString() === action.payload.toString()) {
          order.isDelivered = true
          return order
        } else {
          return order
        }
        })
      }
  }
};
