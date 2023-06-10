import {useEffect, useState, useContext}  from 'react'
import { getAllCategory } from '../categories/FetchApi';
import { getAllProduct } from './FetchApi';

const Search = () => {
    const [search, setSearch] = useState("");
    const [range, setRange] = useState("");
    const [condition, setCondition] = useState("")
    const [category, setCategory] = useState("")
    const [nego, setNego] = useState("")
    const [allCat, setAllCat] = useState({});
    const [productArray, setPa] = useState(null);
  
    
  const rangeHandle = (e) => {
    setRange(e.target.value);
    fetchFilterData(e.target.value);
  };

  const handleConditionChannge = (e) => {
    setsetCondition(e.target.value);
    fetchFilterData(e.target.value);
  };

  const fetchFilterData = async (price) => {
    if (price === "all") {
      try {
        let responseData = await getAllProduct();
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      dispatch({ type: "loading", payload: true });
      try {
        setTimeout(async () => {
          let responseData = await productByPrice(price);
          if (responseData && responseData.Products) {
            console.log(responseData.Products);
            dispatch({ type: "setProducts", payload: responseData.Products });
            dispatch({ type: "loading", payload: false });
          }
        }, 700);
      } catch (error) {
        console.log(error);
      }
    }
  };

    const searchHandle = (e) => {
      setSearch(e.target.value);
      fetchData();
      dispatch({
        type: "searchHandleInReducer",
        payload: e.target.value,
        productArray: productArray,
      });
    };

    const fetchCategoryData = async () => {
      let responseData = await getAllCategory();
      if (responseData.Categories) {
        setAllCat(responseData.Categories);
      }
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
  
    useEffect(() => {
      fetchCategoryData();
    }, []);

    return (
      <div className='bg-white p-4 rounded-lg shadow-md mt-4'>
       <div className="m-4 md:mx-12 md:my-6 grid grid-cols-2 lg:grid-cols-1">
        <div className="flex justify-start w-full mb-4">
          <div className="search-input-nav w-full display-none">
            <div className="relative p-2 mx-4 bg-white rounded-lg w-full h-14">
              <form action="#" className="search-form-f">
                <input type="search" name="searchProducts" id="searchProducts" className="bg-transparent border-1 p-2 rounded-lg focus:outline-none focus:bg-transparent mx-4 text-dark-300 font-md w-full" placeholder="Search - 'Iphone X, Dress, Cars'" style={{height: '60px'}} />
              </form>
              <span className="absolute t-2 r-2">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{ right: '0.5rem', top: '0.5rem', stroke: 'rgb(167, 167, 167)' }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="flex ml-8" style={{ letterSpacing: '0.7rem' }}>
          <span className="cursor-pointer tracking-widest mr-4 ml-4">
          <div className="switch flex">
              <div className="switch__1">
                <input id="switch-1" type="checkbox" 
                  onChange={(e) => handleNegoChannge(e)}
                
                />
                <label for="switch-1"></label>
              </div>
              <span className='ml-4'>Negotiable</span>
            </div>
          </span>
          <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer" title="Category">
            <select name="categories" id="categories"
              onChange={(e) => handleCateChannge(e)}
            >
                {allCat.length > 0
                  ? allCat.map(function (elem) {
                      return (
                        <option name="status" value={elem._id} key={elem._id}>
                          {elem.cName}
                        </option>
                      );
                    })
                  : ""}
            </select>
          </span>
          
          <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer" title="conditions" >
            <select name="conditions" id="conditions"
              onChange={(e) => handleConditionChannge(e)}
            
            >
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Fairly Used">Fairly Used</option>
              <option value="Used">Used</option>

            </select>
          </span>

          <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer">
            <label htmlFor="points" className="text-sm">
              Price (between 0 and 10 le):{" "}
              <span className="font-semibold text-teal-700">{range}.00 le</span>{" "}
            </label>
            <input
              value={range}
              className="slider"
              type="range"
              id="points"
              min="0"
              max="1000"
              step="10"
              onChange={(e) => rangeHandle(e)}
            />
          </span>
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