export const initialState = {
  categories: [],
  subcategories: [],
  subcategories2: [],
  product_cat: [],
  filtered_prod: [],
  product_by_choice: [],
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
    case "SUBCATEGORY2":
      return {
        ...state,
        subcategories2: action.payload,
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
    case "PRODUCT_BY_CHOICE":
      return {
        ...state,
        product_by_choice: action.payload,
      };
    case "ADD_PHOTO":
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat._id.toString() === action.payload.catid.toString()) {
            console.log(cat);
            return action.payload.category;
          } else {
            return cat;
          }
        }),
      };
    default:
      break;
  }
};
