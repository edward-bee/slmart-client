import React, { Fragment, useReducer } from "react";
import Routes from "./components";
import { LayoutContext, layoutState, layoutReducer } from "./components/shop";
import { ProductContext, productReducer, productState } from "./components/shop/products/ProductContext";

function App() {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);
  const [pdata, pdispatch] = useReducer(productReducer, productState);

  return (
    <Fragment>
      <LayoutContext.Provider value={{ data, dispatch }}>
        <ProductContext.Provider value={{ pdata, pdispatch }}>
          <Routes />
        </ProductContext.Provider>
      </LayoutContext.Provider>
    </Fragment>
  );
}

export default App;