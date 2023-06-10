import React, { Fragment, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./style.css";
import {FiBell, FiUser, FiShoppingBag, FiLogOut, FiHeart, FiSearch, FiPlus, FiPlusCircle } from 'react-icons/fi'
import { logout } from "./Action";
import { LayoutContext, ProductContext } from "../index";
import { isAdmin, isAuthenticate } from "../auth/fetchApi";
// import { ProductContext } from "../products";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);
  const { pdata, pdispatch} = useContext(ProductContext)

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const addProductModalPop = () =>
  pdata
  ? pdispatch({ type: "addProductModal", payload: false })
  : pdispatch({ type: "addProductModal", payload: true })

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-20 shadow-lg lg:shadow-none bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-3 lg:grid-cols-3">
        <div
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="hidden lg:block flex items-left col-span-1 w-[40vw]"
          >
            <span className="text-left text-teal-800 font-bold tracking-widest uppercase text-2xl cursor-pointer mr-4">FT MART</span>

            
          <a
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              title="Products"
              onClick={(e) => history.push("/products")}
              href='/products'
            >
                Products
            </a>
            <a
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              title="Categorries"
              onClick={(e) => history.push("/categories")}
              href='/categories'
            >
              Categories
            </a>
            <a
              className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer"
              title="Map"
              onClick={(e) => history.push("product/map")}
              href="/product/map"
            >
              Map
            </a>

          </div>

    <div className="flex justify-start">
       <div className="search-input-nav w-full display-none">
        <div className="relative p-2 mx-4 bg-gray-200 rounded-lg w-full">
          <form action="#" className="search-form-f">
            <input type="search" name="searchProducts" id="searchProducts" className="bg-transparent border-none focus:outline-none focus:bg-transparent mx-4 text-dark-300 font-md w-full" placeholder="Search - 'Iphone X, Dress, Cars'" />
          </form>
          <span className="absolute">
            <FiSearch className=" w-6 h-6" style={{right: '0.5rem', top: '0.5rem', stroke:'#a7a7a7'}} />
          </span>
        </div>
       </div>
    </div>
          {/* <div className="col-span-2 lg:hidden flex	 items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="col-span-1 lg:hidden w-6 h-6 cursor-pointer text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span
              onClick={(e) => history.push("/")}
              style={{ letterSpacing: "0.10rem" }}
              className="flex items-left text-center font-bold uppercase text-teal-800 text-2xl cursor-pointer px-2 text-center"
            >
              SL MART
            </span>
          </div> */}

          <div className="flex items-right col-span-4 lg:col-span-1 flex justify-end">
          {/* notification */}
              <div
              onClick={(e) => history.push("/notiications")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer border-2 border-gray-200 mx-2"
              title="Notifications"
            >
     <span className="flex">
                <FiBell className="w-6 h-6" />
                {
        location.pathname === "/notifications" ?
        'Notifications' : ''
      }
      </span>
            </div>

              {/* notification */}

        {isAuthenticate() ? 
          <div
            onClick={(e) => addProductModalPop() }
            className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer border-2 border-gray-200 mx-2 bg-white"
            title="Upload Product"
          >
            <span className="flex">
                <FiPlusCircle className="w-6 h-6" />
            </span>
          </div>
          :
          <div
          onClick={(e) => (
            loginModalOpen()
          )
          }
          className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer border-2 border-gray-200 mx-2 bg-white"
          title="Upload Product"
        >
          <span className="flex">
              <FiPlusCircle className="w-6 h-6" />
          </span>
        </div>
        }

            {/*  WishList Page Button */}
            <div
              onClick={(e) => history.push("/wish-list")}
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer border-2 border-gray-200 mx-2"
              title="Wishlist"
            >
     <span className="flex">
                <FiHeart className="w-6 h-6" />
                {
        location.pathname === "/wish-list" ?
        'Wish List' : ''
      }
      </span>
            </div>
            {localStorage.getItem("jwt") ? (
              <Fragment>
                <div
                  className="userDropdownBtn hover:bg-gray-200 border-2 border-gray-200 px-2 py-2 rounded-lg relative"
                  title="Logout"
                >
                  <span className="flex justify-center align-bottom"><FiUser className="w-6 h-6" /> Account</span>
                  <div className="userDropdown absolute right-0 mt-1 bg-gray-200 " style={{borderRadius: '5px !important'}}>
                    {!isAdmin() ? (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/user/orders")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
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
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </span>
                            <span>My Orders</span>
                          </span>
                          <span
                            onClick={(e) => history.push("/user/profile")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
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
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </span>
                            <span>My Account</span>
                          </span>
                          {/* Wishlist */}
                          <span
                            onClick={(e) => history.push("/wish-list")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
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
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </span>
                            <span>My Wishlist</span>
                          </span>

                    {/* user Products  */}
                          <span
                            onClick={(e) => history.push("/my-products")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                             <FiShoppingBag className="w-4 h-4" />
                            </span>
                            <span>My Products</span>
                          </span>

                          {/* setting */}
                          <span
                            onClick={(e) => history.push("/user/setting")}
                            className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
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
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </span>
                            <span>Setting</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
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
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </span>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                          <span
                            onClick={(e) => history.push("/admin/dashboard")}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span className="flex">
                             <FiUser className="w-6 h-6" />
                            </span>
                            <span>Admin Panel</span>
                          </span>
                          <span
                            onClick={(e) => logout()}
                            className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                          >
                            <span>
                             <FiLogOut className="w-6 h-6" />
                            </span>
                            <span>Logout</span>
                          </span>
                        </li>
                      </Fragment>
                    )}
                  </div>
                </div>
              </Fragment>
            ) : (
              /* Login Modal Button */
              <div
                onClick={(e) => loginModalOpen()}
                className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg border-2 border-gray-200"
                title="Login"
              >
                <span className="flex">
                  <FiUser className="w-6 h-6" />Account
                </span>
              </div>
            )}
            {/* Cart Modal Button */}
            <div
              onClick={(e) => cartModalOpen()}
              className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer mx-2 border-2 border-gray-200"
              title="Cart"
            >
              <FiShoppingBag className="w-6 h-6" />
              <span className="absolute top-0 ml-6 mt-1 bg-teal-500 rounded-lg px-1 text-white text-xs hover:text-gray-200 font-semibold">
                {data.cartProduct !== null ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            data.navberHamburger && data.navberHamburger
              ? "px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
              : "hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden"
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            <div
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/Shop")}
            >
              Shop
            </div>
            <div
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/categories")}
              title="Categories"
            >
              Categories
            </div>
            <div
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              onClick={(e) => history.push("/top-deals")}
            >
              Top Deals
            </div>
          </div>
        </div>
      </nav>
      {/* End Navber Section */}

    </Fragment>

  );
};

export default Navber;
