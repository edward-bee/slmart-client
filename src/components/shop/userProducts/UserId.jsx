import { getUserById } from "../dashboardUser/FetchApi";

export const fetchUserData = async () => {
  // dispatch({ type: "loading", payload: true });
  let userId = JSON.parse(localStorage.getItem("jwt"))
    ? JSON.parse(localStorage.getItem("jwt")).user._id
    : "";
  try {
    let responseData = await getUserById(userId);
    // console.log(`UUID: ${JSON.stringify(responseData.User._id)}`);
    return responseData.User._id

  } catch (error) {
    console.log(error);
  }
};