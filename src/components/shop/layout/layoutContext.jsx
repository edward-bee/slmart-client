export const layoutState = {
  navberHamburger: false,
  loginSignupModal: false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  orderSuccess: false,
  loading: false,
  addProductModal: false,
};

export const layoutReducer = (state, action) => {
  switch (action.type) {
    case "hamburgerToggle":
      return {
        ...state,
        navberHamburger: action.payload,
      };
    case "loginSignupModalToggle":
      return {
        ...state,
        loginSignupModal: action.payload,
      };
    case "cartModalToggle":
      return {
        ...state,
        cartModal: action.payload,
      };
    case "cartProduct":
      return {
        ...state,
        cartProduct: action.payload,
      };
    case "singleProductDetail":
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    case "inCart":
      return {
        ...state,
        inCart: action.payload,
      };
    case "cartTotalCost":
      return {
        ...state,
        cartTotalCost: action.payload,
      };
    case "loginSignupError":
      return {
        ...state,
        loginSignupError: action.payload,
      };
    case "orderSuccess":
      return {
        ...state,
        orderSuccess: action.payload,
      };
          /* Create a product */
    case "addProductModal":
      return {
        ...state,
        addProductModal: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
