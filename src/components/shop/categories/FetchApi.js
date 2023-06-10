import axios from "axios";
const apiURL = import.meta.env.VITE_REACT_APP_API_URL;

// const Headers = () => {
//   return {
//     headers: {
//       token: `Bearer ${BearerToken()}`,
//     },
//   };
// };

export const getAllCategory = async () => {
    console.log('###');
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`);
    console.log(`Data: ${JSON.stringify(res.data)}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};