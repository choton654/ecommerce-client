export const initialState = {
  cart: {},
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
  }
};
