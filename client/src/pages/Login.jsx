import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { LoginValidation } from "../utils/LoginValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setLogin, setMyUser, setCookie } = useContext(UserContext);
  const navigate = useNavigate();
  const [erros, setErros] = useState({});
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [serversideError, setServerSideError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const myError = LoginValidation({ email, password });
    setErros(myError);
    if (!erros.email && !erros.password && email && password) {
      await axios
        .post("http://localhost:8080/login", { email, password })
        .then((response) => {
          const { detail, token, success, selectedUser } = response.data;
          if (detail) {
            return setServerSideError(detail);
          }
          if (success) {
            setMyUser(selectedUser);
            setCookie("User", selectedUser.name);
            setCookie("Token", token);
            setErros({});
            setServerSideError(null);
            setEmail("");
            setpassword("");

            toast.success("Logged in with success", {
              position: "top-center",
              autoClose: 2000,
            });

            navigate("/admin/users");
          }
        })
        .catch((erro) => {
          // setServerSideError(erro);
          toast.error(`${erro}`, {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <>
      <div className="h-full mt-[72px] flex flex-col items-center justify-center bg-green-50">
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
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Login Now
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
                    placeholder="Enter your email"
                    value={email}
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
                  onClick={(e) => handleLogin(e)}
                >
                  <span className="mr-2 uppercase">Login</span>
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
              You do not have an account?
              <button
                href="#"
                className="text-xs ml-2 text-black font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  return setLogin(false);
                }}
              >
                Register here
              </button>
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
