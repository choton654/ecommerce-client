export const initialState = {
  users: [],
  user: {},
  loginOpen: false,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "ADMIN_USERS":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id.toString() === action.payload._id.toString()) {
            user.role = action.payload.role;
          }
          return user;
        }),
      };
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "USER_PROFILE":
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
    case "ADD_ADDRESS":
      return {
        ...state,
        user: action.payload,
      };
    default:
      break;
  }
};
