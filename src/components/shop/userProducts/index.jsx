import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import ProductMenu from "./ProductMenu";
import ProductTable from "./ProductTable";
import { productState, productReducer } from "./ProductContext";
import { isAuthenticate } from "../auth/fetchApi";

/* This context manage all of the products component's data */
export const ProductContext = createContext();

const ProductComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4 mt-24">
      <ProductMenu />
      <ProductTable />
    </div>
  );
};

const UserProducts = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(productReducer, productState);
  // console.log(`uSER Auth: ${isAuthenticate}`);
  return (
    <Fragment>
      <ProductContext.Provider value={{ data, dispatch }}>
        <Layout children={<ProductComponent />} />
      </ProductContext.Provider>
    </Fragment>
  );
};

export default UserProducts;
