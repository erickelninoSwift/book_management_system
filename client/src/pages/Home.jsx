import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="my-10 mx-auto flex w-full max-w-screen-lg flex-col rounded-2xl bg-green-50 px-4">
        <p className="mt-20 text-center sm:text-lg font-semibold text-lime-400">
          CONTACT MANAGEMENT SYSTEM
        </p>
        <h1 className="mx-auto mt-2 max-w-3xl text-center text-2xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          Let's Manage All your Clients's Contacts
        </h1>
        <p className="mx-auto hidden sm:block mt-4 max-w-5xl text-center text-gray-500 sm:mt-8 sm:text-lg">
          Start Collecting your contacts in a very smarter way. We provide a
          very efficient and smarter way to handle contacts
        </p>

        <div className="mx-auto mt-8 mb-20 flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-y-0 sm:space-x-6">
          <Link
            to={"/login"}
            className="rounded-full bg-black px-10 py-3 font-medium text-white hover:opacity-80 sm:w-auto"
          >
            Get Started
          </Link>
          <button className="rounded-full border-2 border-black px-10 py-3 font-medium text-black transition hover:bg-black hover:text-white sm:w-auto">
            View Pricing
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
