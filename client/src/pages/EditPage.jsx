import React, { useState, useContext, useEffect } from "react";
import { validation } from "../utils/AddContactValidator";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditPage = () => {
  const { id, postedBy } = useParams();
  const { cookies, AlluserRegistered } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [erros, setErros] = useState({});
  const [serversideError, setServerSideError] = useState(null);

  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    const myError = validation({ name, email, phone, address });
    setErros(myError);
    if (!name || !email || !phone || !address) {
      return;
    }
    await axios
      .put(
        `http://localhost:8080/contacts?id=${id}&postedBy=${postedBy}`,
        {
          name,
          email,
          phone,
          address,
        },
        {
          headers: { Authorization: `Bearer ${cookies.Token}` },
        }
      )
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          setServerSideError(null);
          setEmail("");
          setName("");
          setPhone("");
          setAddress("");
          setErros({});
          toast.success(message, {
            position: "top-center",
            autoClose: 2000,
          });
          setSubmitMessage("Contact was updated with success");
          navigate("/admin/users");
        }
      })
      .catch((erro) => {
        return toast.error(`${erro.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    const selectedContact = AlluserRegistered.find((user) => user._id === id);
    const { address, email, name, phone } = selectedContact;
    if (selectedContact) {
      setName(name);
      setEmail(email);
      setAddress(address);
      setPhone(phone);
    }
  }, [id]);
  return (
    <>
      <div className="h-[100vh] w-full flex flex-col items-center justify-center bg-green-50">
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
          <div className="font-medium mx-auto self-center text-xl sm:text-3xl w-[600px] text-gray-800">
            Update
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            You can make any changes and update by clicking update button
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
                    placeholder="Enter your name"
                    value={name}
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
                  htmlFor="address"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Address:
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
                    id="address"
                    type="text"
                    name="address"
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {erros.address && (
                  <span className="text-[12px] mt-2 p-2 text-red-600 bg-red-100 rounded-md ">
                    {erros.address}
                  </span>
                )}
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="phone"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Phone:
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
                    id="phone"
                    type="text"
                    name="phone"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {erros.phone && (
                  <span className="text-[12px] mt-2 p-2 text-red-600 bg-red-100 rounded-md ">
                    {erros.phone}
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
                  onClick={(e) => handleRegisterUser(e)}
                >
                  <span className="mr-2 uppercase">Update</span>
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
          {submitMessage && (
            <span className="text-[12px] mt-5 p-2 text-green-700 bg-green-100 rounded-md ">
              {submitMessage}
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
          ></a>
        </div>
      </div>
    </>
  );
};

export default EditPage;
