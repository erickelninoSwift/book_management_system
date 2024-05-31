import React, { useContext } from "react";
import TableRow from "../components/TableRow";
import { UserContext } from "../context/UserContext";
const Allusers = () => {
  const { AlluserRegistered } = useContext(UserContext);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
