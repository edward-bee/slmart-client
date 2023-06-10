import {useEffect, useState, useContext}  from 'react'
import { getAllProduct } from './FetchApi';

const Search = () => {
    const [search, setSearch] = useState("");
    const [productArray, setPa] = useState(null);
  
    const searchHandle = (e) => {
      setSearch(e.target.value);
      fetchData();
      dispatch({
        type: "searchHandleInReducer",
        payload: e.target.value,
        productArray: productArray,
      });
    };

    const fetchData = async () => {
      dispatch({ type: "loading", payload: true });
      try {
        setTimeout(async () => {
          let responseData = await getAllProduct();
          if (responseData && responseData.Products) {
            setPa(responseData.Products);
            dispatch({ type: "loading", payload: false });
          }
        }, 700);
      } catch (error) {
        console.log(error);
      }
    };
  
 
    return (
      <div className='bg-white p-4 rounded-lg shadow-md mt-4'>
       <div className="m-4 md:mx-12 md:my-6 grid grid-cols-2 lg:grid-cols-1">
        <div className="flex justify-start w-full mb-4">
          <div className="search-input-nav w-full display-none">
            <div className="relative p-2 mx-4 bg-gray-200 rounded-lg w-full h-14">
              <form action="#" className="search-form-f">
                <input type="search" name="searchProducts" id="searchProducts" className="bg-transparent border-none focus:outline-none focus:bg-transparent mx-4 text-dark-300 font-md w-full" placeholder="Search - 'Iphone X, Dress, Cars'" />
              </form>
              <span className="absolute">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ right: '0.5rem', top: '0.5rem', stroke: 'rgb(167, 167, 167)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex items-left col-span-1 w-[40vw]" style={{ letterSpacing: '0.7rem' }}>
          <span className="text-left text-teal-800 font-bold tracking-widest uppercase text-2xl cursor-pointer mr-4">FT MART</span>
          <a className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer" title="Products" href="/products">Products</a>
          <a className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer" title="Categorries" href="/categories">Categories</a>
          <a className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer" title="Map" href="/product/map">Map</a>
        </div>
      </div>
      </div>
    );
  };
const SearchAndFilterBar = () => {

    return(
        <div>
            <Search />
        </div>
    )
}
export default SearchAndFilterBar