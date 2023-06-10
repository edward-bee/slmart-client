import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import ProductCategory from "./ProductCategory";
import { categoryState, categoryReducer } from "./CategoryContext";

export const CategoryContext = createContext();

const CategoryComponent = () => {
  return (
    <Fragment>
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
    </Fragment>
  );
};

const Category = (props) => {
  const [data, dispatch] = useReducer(categoryReducer, categoryState);
  console.log(`cat: ${data}`);
  return (
    <Fragment>
      <CategoryContext.Provider value={{ data, dispatch }}>
        <Layout children={<CategoryComponent />} />
      </CategoryContext.Provider>
    </Fragment>
  );
};

export default Category;
