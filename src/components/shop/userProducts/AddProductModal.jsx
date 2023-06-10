import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { createProduct, getAllUserProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
import axios from "axios";
import { fetchUserData } from "../userProducts/UserId";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );
  const [uid, setUid] = useState('')
  const [fData, setFdata] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null, // Initial value will be null or empty array
    pCategory: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    pNegotiation: "",
    pCondition: "",
    pCoordinates: "",
    success: false,
    error: false,
    pTags: '',
  });

  const fetchData = async () => {
    let responseData = await getAllUserProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const getProductPrediction = () => {

  }

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    // if (!fData.pImage) {
    //   setFdata({ ...fData, error: "Please upload at least 2 image" });
    //   setTimeout(() => {
    //     setFdata({ ...fData, error: false });
    //   }, 2000);
    // }

    try {
      // console.log(`FD: ${JSON.stringify(fData)}`);  
      const userId = await fetchUserData();

      let responseData = await createProduct(fData, userId);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          pName: "",
          pDescription: "",
          pImage: "",
          pStatus: "Active",
          pCategory: "",
          pPrice: "",
          pQuantity: "",
          pOffer: 0,
          success: responseData.success,
          error: false,
          pNegotiation: "",
          pCondition: "",
        });
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: "",
            pDescription: "",
            pImage: "",
            pStatus: "Active",
            pCategory: "",
            pPrice: "",
            pQuantity: "",
            pOffer: 0,
            success: false,
            error: false,
            pNegotiation: "",
            pCondition: "",
            
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [pTags, setPTags] = useState([]);

  const addTag = (e) => {
    const val = e.target.value;
    console.log(`vall: ${val}`);
    if (val !== "") {
      setPTags((prevPTags) => [...prevPTags, val]);
      setFdata((prevFData) => ({
        ...prevFData,
        pTags: '',
      }));
      e.target.value = ''
      console.log(`Tags: ${JSON.stringify(pTags)}`);
    }
  };
  
  const getCoordinate = async () => {
    try {
      let res = await axios.get(`https://ipapi.co/json`);
      setFdata({ ...fData, pCoordinates: res.data });
    } catch (error) {
      console.log(error);
      console.log("baa");
    }
  };

  useEffect(() => {
    if (!fData.pCoordinates) {
      getCoordinate();
    }
    return () => {
      setFdata({ pCoordinates: {} });
    };
  }, []);

  // console.log(`Coords: ${JSON.stringify(fData.pCoordinates)}`);

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addProductModal", payload: false })}
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8 rounded-lg">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: "#303031" }}
              onClick={(e) =>
                dispatch({ type: "addProductModal", payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>

              {/* Most Important part for uploading multiple image */}
              <div className="flex flex-col mt-4">
              <label htmlFor="image">Product Images *</label>
              <span className="text-gray-600 text-xs">Must need 2 images</span>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pImage: [...e.target.files],
                  })
                }
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                id="image"
                multiple
              />
            </div>
            {/* Most Important part for uploading multiple image */}
            {!fData.pImage ? <div>No images here </div>
            :
          <div>
            {/* product name  */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  type="text"
                />
              </div>
              {/* product price  */}
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="price"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description">Product Description *</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                name="description"
                id="description"
                cols={5}
                rows={4}
              />
            </div>
            
            {/* product status */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="status"
                >
                  <option name="status" value="Active">
                    Active
                  </option>
                  <option name="status" value="Disabled">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Category *</label>
                <select
                  value={fData.pCategory}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="status"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option name="status" value={elem._id} key={elem._id}>
                            {elem.cName}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>

{/* product in stock  */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offfer (%) *</label>
                <input
                  value={fData.pOffer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="offer"
                />
              </div>
            </div>
  
{/* p negotiation */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="negotiation">Negotiable *</label>
                <select
                  value={fData.pNegotiation}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pNegotiation: e.target.value,
                    })
                  }
                  name="negotiation"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="negotiation"
                >
                  <option value=""></option>
                  <option value="Yes">
                    Yes
                  </option>
                  <option value="No">
                    No
                  </option>
                </select>
              </div>

            {/* product conditions */}
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="condition">Condition *</label>
                <select
                  value={fData.pCondition}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCondition: e.target.value,
                    })
                  }
                  name="condition"
                  className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                  id="condition"
                >
                  <option value=""></option>
                  <option value="New">
                    New
                  </option>
                  <option value="Fairly Used">
                    Fairly Used
                  </option>

                  <option value="Used">
                    Used
                  </option>

                </select>
              </div>
            
            </div>

{/* tags */}
            {/* <div className="flex flex-col space-y-2">
              <label htmlFor="tags">Product tags *</label>
              <input
                value={fData.pTags}
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    pTags: e.target.value,
                  })
                }
                className="px-4 py-2 border focus:outline-none rounded bg-gray-200"
                name="tags"
                id="tags" 
                onKeyUp={e => (e.key === "Enter" ? addTag(e) : null)}
                />
              {
                fData.pTags.map((tag, key) => {
                  return(
                    <span className="">{tag.name}</span>
                  )
                })
              }
            </div>
             */}
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create product
              </button>
            </div>
            </div>
            }
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = (props) => {
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const [allCat, setAllCat] = useState({});

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setAllCat(responseData.Categories);
    }
  };

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
