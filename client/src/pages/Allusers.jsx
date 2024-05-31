import React, { useContext, useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import { UserContext } from "../context/UserContext";
const Allusers = () => {
  const { AlluserRegistered, setAllusersRegisered, cookies } =
    useContext(UserContext);

  const [emptyMessage, setEmptyMessage] = useState(null);
  useEffect(() => {
    const handleFetchAllContact = async () => {
      const response = await fetch("http://localhost:8080/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.Token}`,
        },
      });
      const data = await response.json();
      const { success, contacts, norecord, errorFound } = data;
      if (!success && norecord) {
        setEmptyMessage(errorFound.toUpperCase());
      }

      setAllusersRegisered(() => contacts);
      setEmptyMessage(null);
    };
    handleFetchAllContact();
  }, []);
  return (
    <div className="bg-green-50 w-full ml-5 pl-2">
      <h3 className="mt-6 text-xl ml-5">My Contacts</h3>

      <div className="flex flex-col mt-6 mx-5">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
              <table className="border-collapse w-full">
                <thead>
                  <tr>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Id
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Name
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Email
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Phone
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Address
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Date
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AlluserRegistered &&
                    AlluserRegistered.map((singleUser) => {
                      return (
                        <TableRow
                          key={singleUser._id}
                          currentUser={singleUser}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
            {emptyMessage && (
              <p className="w-[100%] text-center bg-red-100 text-red-900 p-5 rounded-lg mt-2">
                {emptyMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
