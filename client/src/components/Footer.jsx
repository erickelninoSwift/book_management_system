import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="bg-white light:bg-gray-900 w-[1270px] mx-auto">
        <div className="container px-6 py-8 mx-auto">
          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-black">
              © Copyright {new Date().getFullYear()}. All Rights Reserved.
            </p>

            <div className="flex mt-3 -mx-2 sm:mt-0">
              <Link
                to={"/home"}
                className="mx-2 text-sm text-black transition-colors duration-300 hover:text-black dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                Home{" "}
              </Link>

              <Link
                to={"/about"}
                className="mx-2 text-sm text-black transition-colors duration-300 hover:text-black dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                About{" "}
              </Link>

              <Link
                to={"/login"}
                className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Reddit"
              >
                {" "}
                Login{" "}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
