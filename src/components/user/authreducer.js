export const initialState = {
  user: {},
  loginOpen: false,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        loginOpen: !state.loginOpen,
      };
    case "EDIT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      break;
  }
};
