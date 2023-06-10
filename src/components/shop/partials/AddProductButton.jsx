import React, {useContext} from 'react'
import { FiPlus } from 'react-icons/fi';
import { ProductContext } from '../products';


export default function AddProductButton (){

const { dispatch } = useContext(ProductContext);
console.log(dispatch);
    return(
        <div
          className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer border-2 border-gray-200 mx-2"
          title="Upload Product"
          onClick={(e) =>
            dispatch({ type: "addProductModal", payload: true })
          }
        >
            <span className="flex">
              <FiPlus className="w-6 h-6" />
            </span>
        </div>
    )
}