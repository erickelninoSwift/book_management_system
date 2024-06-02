import React, { useContext, useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import { UserContext } from "../context/UserContext";
import DataTable from "react-data-table-component";
import { CircleLoader } from "react-spinners";
import Alert from "../components/Alert";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Allusers = () => {
  const {
    AlluserRegistered,
    setAllusersRegisered,
    cookies,
    alertDelete,
    setAlertDelete,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [itemDelete, setItemDelete] = useState("");

  const columns = [
    {
      name: "ID",
      selector: (row) => row._id.slice(0, 8),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    ,
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt.slice(0, 10),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <div className="flex gap-2">
            <Link to={`/admin/edit/${row._id}/${row.postedBy}`}>
              <FaPenToSquare className="w-[20px] h-[20px] text-green-700" />
            </Link>
            <Link>
              <FaRegTrashCan
                className="w-[20px] h-[20px] text-red-600"
                onClick={() => {
                  setItemDelete(row._id);
                  setAlertDelete(!alertDelete);
                }}
              />
            </Link>
          </div>
        </>
      ),
    },
  ];

  const [emptyMessage, setEmptyMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      }

      setAllusersRegisered(() => contacts);
      setEmptyMessage(null);
      setLoading(false);
    };
    handleFetchAllContact();
  }, []);

  return (
    <>
      <div className="bg-green-50 w-full p-10">
        <h3 className="mt-6 text-xl ml-5">My Contacts</h3>
        {loading ? (
          <CircleLoader className="w-full h-[100%] mx-auto p-[20px] mt-[100px]" />
        ) : (
          <div className="mt-5">
            {AlluserRegistered && (
              <DataTable
                columns={columns}
                data={AlluserRegistered}
                pagination
              />
            )}
          </div>
        )}
      </div>
      {alertDelete && <Alert itemTodeleteID={itemDelete} />}
    </>
  );
};

export default Allusers;

{
  /* <div className="flex flex-col mt-6 mx-5">
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
      </div> */
}
