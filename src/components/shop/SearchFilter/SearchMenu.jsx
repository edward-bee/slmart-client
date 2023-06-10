import React, { Fragment, useContext } from "react";
import { ProductContext } from "./index";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { isAuthenticate } from "../auth/fetchApi";
import { FiPlusCircle } from "react-icons/fi";
import { LayoutContext } from "../index";
import SearchAndFilterBar from "./SearchAndFilterBar";

const SearchMenu = (props) => {

  const { data, dispatch: layoutDispatch } = useContext(LayoutContext);
  const { dispatch } = useContext(ProductContext);

  const loginModalOpen = () =>
  data.loginSignupModal
    ? layoutDispatch({ type: "loginSignupModalToggle", payload: false })
    : layoutDispatch({ type: "loginSignupModalToggle", payload: true });

  return (
    <Fragment>
      <div className="col-span-1 flex justify-between items-center">
        <div className="flex items-center">
          
          {/* It's open the add product modal */}
          {isAuthenticate() ? 
          <span
            style={{ background: "#303031" }}
            onClick={(e) =>
              dispatch({ type: "addProductModal", payload: true })
            }
            className="rounded-full cursor-pointer p-2 bg-gray-800 flex items-center text-gray-100 text-sm font-semibold uppercase"
          >
            <FiPlusCircle className="mr-2 text-xl" />
            Add Product
          </span>
          :
          <span
          style={{ background: "#303031" }}
          onClick={(e) => (
            loginModalOpen()
          )
          }
          className="rounded-full cursor-pointer p-2 bg-gray-800 flex items-center text-gray-100 text-sm font-semibold uppercase"
        >
          <FiPlusCircle className="mr-2 text-xl" />
          Add Product
        </span>
        }

        <SearchAndFilterBar />
        </div>



        <AddProductModal />
        <EditProductModal />
      </div>
    </Fragment>
  );
};

export default SearchMenu;
