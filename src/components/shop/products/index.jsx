import React, { Fragment, createContext, useReducer } from "react";
import ProductMenu from "./ProductMenu";
import { productState, productReducer } from "./ProductContext";
import Layout from "../layout";
import Products from "./products";

/* This context manage all of the products component's data */
export const ProductContext = createContext();

const ProductComponent = () => {
  return (
    <div className="space-y-4 p-4 mt-20">
      <ProductMenu />
      <Products />
    </div>
  );
};

const AllProducts = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(productReducer, productState);

  return (
    <Fragment>
      <ProductContext.Provider value={{ data, dispatch }}>
        <Layout children={<ProductComponent />} />
      </ProductContext.Provider>
    </Fragment>
  );
};

export default AllProducts;
