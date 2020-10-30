export const initialState = {
  categories: [],
  subcategories: [],
  product_cat: [],
  filtered_prod: [],
  isFiltered: false,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: action.payload,
      };
    case "ADD_SINGLE_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "EDIT_SINGLE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        ),
      };
    case "SUBCATEGORY":
      return {
        ...state,
        subcategories: action.payload,
      };
    case "DELETE_CAT":
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat._id.toString() !== action.payload.toString()
        ),
      };
    case "PRODUCT_BY_CAT":
      return {
        ...state,
        product_cat: action.payload,
      };
    case "FILTER_PRODUCT":
      return {
        ...state,
        filtered_prod: action.payload,
        isFiltered: !state.isFiltered,
      };
    default:
      break;
  }
};
