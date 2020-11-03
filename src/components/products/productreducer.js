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
    case "DELETE_PROD":
      return {
        ...state,
        products: state.products.filter(
          (prod) => prod._id.toString() !== action.payload.toString()
        ),
      };
    case "DELETE_PROD_PIC":
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod._id.toString() === action.payload.productid.toString()) {
            prod.photo = action.payload.photo;
            return prod;
          } else {
            return prod;
          }
        }),
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod._id.toString() === action.payload.productid.toString()) {
            console.log(action.payload.item.category);
            if (prod.category) {
              prod.category.name = action.payload.item.category.name;
              prod.category._id = action.payload.item.category._id;
            }
            prod.name = action.payload.item.name;
            prod.description = action.payload.item.description;
            prod.price = action.payload.item.price;
            prod.count = action.payload.item.count;
            prod.brand = action.payload.item.brand;
            return prod;
          } else {
            return prod;
          }
        }),
      };
    default:
      break;
  }
};
