export const initialState = {
  products: [],
  product: {},
  diff_product: [],
  filtered_prod: null,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "PRODUCT":
      return {
        ...state,
        product: action.payload.product,
        diff_product: action.payload.diffProducts,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FILTER_PRODUCT":
      return {
        ...state,
        filtered_prod: action.payload,
      };
    default:
      break;
  }
};
