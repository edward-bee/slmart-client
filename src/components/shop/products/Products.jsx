import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";
import ProductCard from "../partials/ProductCard";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

const Products= (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">

            {products && products.length > 0 ? (
              <section className="m-4 mb-16 md:mx-8 md:mb-16 md:my-6 gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4" style={{marginBottom: '30vh'}}>
                {products.map((item, key) => {
                  return (
                    <div>
                      <ProductCard key={key} item={item} />
                    </div>
                  );
                })}
              </section>
            ) : (
                <div
                  colSpan="10"
                  className="text-xl text-center font-semibold py-8"
                >
                  No product found
                </div>
            )}
       
        <div className="text-sm text-gray-600 mt-2">
          Total {products && products.length} product found
        </div>
      </div>
    </Fragment>
  );
};


export default Products;
