import ApiLoader from "@/components/common/ApiLoader";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Signup() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isEmailDuplicate, setEmailDuplicate] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("api/userSignUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.authToken);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("isAdmin", false);
      router.push("/");
      //logic for signup
    } else {
      setLoading(false)
      setEmailDuplicate(res?.error?.includes("duplicate key error collection"))
      alert(res?.error?.includes("duplicate key error collection") ? "Used Email Address":"There is something wrong. Please try again");
    }
  };

  const handleChange = (e) => {
    if(e.target.name === "email"){
      setEmailDuplicate(false);
    }
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const goLogin = () => {
    setLoading(true);
    router.push("/login");
  }

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
      }}
      className="flex justify-center items-center"
    >
      {isLoading ?
        <ApiLoader/>
        :
        <div className="container w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              type="text"
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-[#d7615b] text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.name}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              type="email"
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-[#d7615b] text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.email}
            />
          </div>
          {isEmailDuplicate && <div className="my-4 text-red-500">This email is already used</div>}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              placeholder="*******"
              onChange={handleChange}
              name="password"
              required
              type="password"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-[#d7615b] text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.password}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="geolocation"
              className="block text-gray-700  dark:text-gray-300 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              placeholder="enter your address"
              onChange={handleChange}
              name="geolocation"
              required
              type="text"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-[#d7615b] text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={credentials.geolocation}
            />
          </div>
          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="border-2 mr-2 p-2 dark:border-gray-400 border-[#d7615b] rounded  hover:bg-[#d7615b] hover:text-gray-100 dark:text-gray-100"
          >
            Signup
          </button>
          {/* <Link href={"/login"} style={{ all: "unset" }}> */}
            <button className="border-2 mr-2 p-2 dark:border-gray-400 border-[#d7615b] rounded  hover:bg-[#d7615b] hover:text-gray-100 dark:text-gray-100" onClick={goLogin}>
              Already a user?
            </button>
          {/* </Link> */}
        </form>
      </div>}
    </div>
  );
}

export default Signup;
