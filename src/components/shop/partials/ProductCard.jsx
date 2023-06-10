import React, {useState} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { isWish, isWishReq, unWishReq } from '../products/Mixins';

const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

export default function ProductCard(props){

const history = useHistory();

/* WhisList State */
const [wList, setWlist] = useState(
  JSON.parse(localStorage.getItem("wishList"))
);

    const { item } = props
    return(
      <div tabindex="0" className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8 border-gray-200 border-1 p-2 rounded-lg hover:cursor-pointer bg-white" style={{borderRadius: 20, }}>
                        <div>
                            <img 
                               onClick={(e) => history.push(`/products/${item._id}`)}
                                         className="w-full object-cover object-center cursor-pointer rounded bg-gray-300 focus:outline-none"
                                         style={{height: '200px'}}
                                         src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                                         alt={item._id} />
                        </div>
                        <div className="bg-white">
                            <div className="flex items-center justify-between px-4 pt-4">
                                <div>
                     {/* WhisList Logic  */}
                 <div className="">
                 <svg
                    onClick={(e) => isWishReq(e, item._id, setWlist)}
                    className={`${
                      isWish(item._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-700 transition-all duration-300 ease-in`}
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
                  <svg
                    onClick={(e) => unWishReq(e, item._id, setWlist)}
                    className={`${
                      !isWish(item._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-700 transition-all duration-300 ease-in`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
            {/* WhisList Logic End */}
                                </div>
                                <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                    {/* <p tabindex="0" className="focus:outline-none text-xs text-yellow-700">Featured</p> */}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center">
                                    <h2 tabindex="0" className="focus:outline-none text-lg font-semibold truncate"> {item.pName}</h2>
                                    <p tabindex="0" className="focus:outline-none text-xs text-gray-600 pl-5">4 days ago</p>
                                </div>
                                <p tabindex="0" className="focus:outline-none text-xs text-gray-600 mt-2 truncate">{item.pDescription}</p>
                                {/* <div className="flex mt-4">
                                    <div>
                                        <p tabindex="0" className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
                                    </div>
                                    <div className="pl-2">
                                        <p tabindex="0" className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                    </div>
                                </div> */}
                                <div className="flex items-center justify-between py-4">
                                    <h2 tabindex="0" className="focus:outline-none text-indigo-700 text-xs font-semibold">Bay Area, San Francisco</h2>
                                    <h3 tabindex="0" className="focus:outline-none text-indigo-700 text-xl font-semibold"></h3>
                                </div>
                            </div>
                        </div>
                    </div>

        // <div className="relative m-2 " >
        //         <img
        //           onClick={(e) => history.push(`/products/${item._id}`)}
        //           className="w-full object-cover object-center cursor-pointer rounded bg-gray-300 "
        //           style={{height: '120px'}}
        //           src={`${apiURL}/uploads/products/${item.pImages[0]}`}
        //           alt={item._id}
        //         />
        //         <div className="flex items-center justify-between mt-2">
        //           <div className="text-teal-600 font-bold truncate text-lg uppercase">
        //             {item.pName}
        //           </div>
        //           <div className="flex items-center space-x-1">
        //             <span>
        //               <svg
        //                 className="w-4 h-4 fill-current text-orange-400"
        //                 fill="none"
        //                 stroke="currentColor"
        //                 viewBox="0 0 24 24"
        //                 xmlns="http://www.w3.org/2000/svg"
        //               >
        //                 <path
        //                   strokeLinecap="round"
        //                   strokeLinejoin="round"
        //                   strokeWidth={2}
        //                   d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        //                 />
        //               </svg>
        //             </span>
        //             <span className="text-gray-700">
        //               {item.pRatingsReviews.length}
        //             </span>
        //           </div>
        //         </div>
        //         <div className="m-4 w-full item-left">
        //             <div className="text-gray-600 truncate">
        //               {/* {item.pDescription} */}
        //             </div>
        //           </div>
        //         <div className="flex item-right">
        //           <div className="text-blue-400 font-bold">le {item.pPrice}.00</div>
        //         </div>
        //         {/* WhisList Logic  */}
        //         <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
        //           <svg
        //             onClick={(e) => isWishReq(e, item._id, setWlist)}
        //             className={`${
        //               isWish(item._id, wList) && "hidden"
        //             } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-700 transition-all duration-300 ease-in`}
        //             fill="none"
        //             stroke="currentColor"
        //             viewBox="0 0 24 24"
        //             xmlns="http://www.w3.org/2000/svg"
        //           >
        //             <path
        //               strokeLinecap="round"
        //               strokeLinejoin="round"
        //               strokeWidth={2}
        //               d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        //             />
        //           </svg>
        //           <svg
        //             onClick={(e) => unWishReq(e, item._id, setWlist)}
        //             className={`${
        //               !isWish(item._id, wList) && "hidden"
        //             } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-red-700 transition-all duration-300 ease-in`}
        //             fill="currentColor"
        //             viewBox="0 0 20 20"
        //             xmlns="http://www.w3.org/2000/svg"
        //           >
        //             <path
        //               fillRule="evenodd"
        //               d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        //               clipRule="evenodd"
        //             />
        //           </svg>
        //         </div>
        //         {/* WhisList Logic End */}
        //       </div>
    )
}