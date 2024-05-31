import React, { useContext } from "react";
import profilePhoto from "../assets/600X600.jpg";
import { UserContext } from "../context/UserContext";
const Profile = () => {
  const { chosenUser } = useContext(UserContext);
  console.log(chosenUser);
  const { name, email, createAt } = chosenUser;
  return (
    <>
      <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
          <img
            className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src={profilePhoto}
            alt="erickelnino"
          />
          <div className="text-center mt-2 text-3xl font-medium">{name}</div>
          <div className="text-center mt-2 font-light text-sm">{email}</div>
          <div className="text-center font-normal text-lg">
            Full Stack Javascript Developer
          </div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>
              Fullstack Developer [MERN], avid reader. Love to take a long walk,
              swim
            </p>
          </div>

          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <span className="font-bold">1.8 k</span> Followers
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold">2.0 k</span> Following
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
