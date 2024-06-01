import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { validation } from "../utils/Validator";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { setLogin, token, setMyUser, setCookie } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [erros, setErros] = useState({});
  const [serversideError, setServerSideError] = useState(null);
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const myError = validation({ name, email, password });
    setErros(myError);
    if (!erros.name && !erros.email && !erros.password) {
      await axios
        .post("http://localhost:8080/signup", { name, email, password })
        .then((response) => {
          const { token, createUser, success } = response.data;
          if (success) {
            setServerSideError(null);
            setCookie("User", createUser.name);
            setCookie("Token", token);
            setEmail("");
            setName("");
            setpassword("");
            setErros({});
            setMyUser(createUser);
            toast.success("Account was created", {
              position: "top-center",
              autoClose: 2000,
            });
            navigate("/admin/users");
          }
        })
        .catch((erro) => {
          return toast.error(`${erro.message}`, {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
  };
  return (
    <div className="h-full my-[80px] flex flex-col items-center justify-center bg-green-50">
      <div
        className="
          flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >
        <div className="font-medium  self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                Name:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-user text-blue-500"></i>
                </div>

                <input
                  id="name"
                  type="text"
                  name="name"
                  disabled={token ? true : false}
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {erros.name && (
                <span className="text-[12px] mt-2 p-2 text-red-600 bg-red-100 rounded-md ">
                  {erros.name}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i className="fas fa-at text-blue-500"></i>
                </div>

                <input
                  id="email"
                  type="email"
                  disabled={token ? true : false}
                  name="email"
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {erros.email && (
                <span className="text-[12px] mt-2 p-2 text-red-600 bg-red-100 rounded-md ">
                  {erros.email}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <div
                  className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <span>
                    <i className="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  disabled={token ? true : false}
                  className="
                    text-sm
                    placeholder-gray-500
                    pl-4
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              {erros.password && (
                <span className="text-[12px] mt-2 p-2 text-red-600 bg-red-100 rounded-md ">
                  {erros.password}
                </span>
              )}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                disabled={token ? true : false}
                className="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
                onClick={(e) => handleRegisterUser(e)}
              >
                <span className="mr-2 uppercase">Sign Up</span>
                <span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        {serversideError && (
          <span className="text-[12px] mt-5 p-2 text-red-600 bg-red-100 rounded-md ">
            {serversideError}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span className="ml-2">
            You have an account?
            <button
              href="#"
              className="text-xs ml-2 text-black font-semibold"
              onClick={(e) => handleLogin(e)}
            >
              Login here
            </button>
          </span>
        </a>
      </div>
    </div>
  );
};

export default Register;
