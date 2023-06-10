import React, { Fragment, useState, useEffect } from "react";
import { signupReq } from "./fetchApi";

const Signup = (props) => {

   
const [location, setLocation] = useState({});
const [deviceName, setDeviceName] = useState('');

useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
  setDeviceName(navigator.userAgent);

}, []);

console.log(`Location: ${JSON.stringify(location)}, device: ${deviceName}`);

const districts = [
  { id: 0, name: "Bombali", population: 606408, area: 6950 },
  { id: 1, name: "Falaba", population: 262157, area: 3794 },
  { id: 2, name: "Kailahun", population: 354562, area: 8428 },
  { id: 3, name: "Kambia", population: 343146, area: 4628 },
  { id: 4, name: "Kenema", population: 653063, area: 10554 },
  { id: 5, name: "Koinadugu", population: 321614, area: 12107 },
  { id: 6, name: "Moyamba", population: 361770, area: 6674 },
  { id: 7, name: "Port Loko", population: 557978, area: 4130 },
  { id: 8, name: "Pujehun", population: 406247, area: 4424 },
  { id: 9, name: "Tonkolili", population: 323100, area: 7325 },
  { id: 10, name: "Western Rural", population: 317218, area: 558 },
  { id: 11, name: "Western Urban", population: 1127217, area: 354 },
  { id: 12, name: "Bonthe", population: 200748, area: 3185 },
  { id: 13, name: "Bo", population: 654142, area: 6542 },
  { id: 14, name: "Kono", population: 504611, area: 10503 }
];

const localAreas = {
  WesternArea: ['Freetown', 'Koyeima', 'Waterloo', 'Kambia'],
  NorthernProvince: ['Bombali', 'Port Loko', 'Kambia', 'Tonkolili'],
  SouthernProvince: ['Bo', 'Bonthe', 'Moyamba', 'Pujehun'],
  EasternProvince: ['Kono', 'Kenema', 'Kailahun'],
};

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    gender: 0,
    district: '',
    device: deviceName,
    location: location,
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
        signInDevice: data.device,
        signInLocation: data.location,
        gender: data.gender,
        district: data.district
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          gender:"",
          district: "",
          loading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      <form className="space-y-4">
        {data.success ? alert(data.success, "green") : ""}
        <div className="flex flex-col">
          <label htmlFor="name">
            Name<span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            className={`${
              data.error.name ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          />
          {!data.error ? "" : alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="email"
            id="email"
            className={`${
              data.error.email ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          />
          {!data.error ? "" : alert(data.error.email, "red")}
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender">
            Gender<span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <select
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                gender: e.target.value,
              })
            }
            value={data.gender}
            type="gender"
            id="gender"
            className={`${
              data.error.gender ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          >
            <option value="0"></option>
            <option value="1">Male</option>
            <option value="2">Female</option>

            </select>
          {!data.error ? "" : alert(data.error.gender, "red")}
        </div>

        <div className="flex flex-col">
          <label htmlFor="district">
            District<span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <select
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                district: e.target.value,
              })
            }
            value={data.district}
            type="district"
            id="district"
            className={`${
              data.error.district ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          >
            <option value={null}></option>
            
            {
              districts.map((product, key) => {
                // const product = JSON.stringify(item)
                console.log(`product: ${product}`);
                return(
                  <option value={product.id} key={key}>{product.name}</option>
                )
              })
            }

            </select>
          {!data.error ? "" : alert(data.error.district, "red")}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error.password ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          />
          {!data.error ? "" : alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1 mx-4">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`${
              data.error.cPassword ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2`}
          />
          {!data.error ? "" : alert(data.error.cPassword, "red")}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border bg-gray-200 rounded-full mt-2 mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-teal-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          onClick={(e) => formSubmit()}
          className="px-4 py-2 text-white text-center cursor-pointer font-medium bg-teal-600 rounded-full"
        >
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;
