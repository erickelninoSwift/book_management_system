import React from "react";

const TableRow = ({ currentUser }) => {
  const { _id, name, email, createdAt, phone, address } = currentUser;
  return (
    <tr className="bg-white lg:hover:bg-yellow-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          ID
        </span>
        #{_id.slice(0, 4).toUpperCase()}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          NAME
        </span>
        {name}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          EMAIL
        </span>
        {email}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          PHONE
        </span>
        {phone}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          ADDRESS
        </span>
        {address}
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          DATE
        </span>
        <span className="rounded bg-blue-300 py-1 px-3 text-xs font-bold">
          {createdAt.slice(0, 10)}
        </span>
      </td>
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Actions
        </span>
        <a href="#" className="text-blue-400 hover:text-blue-600 underline">
          Edit
        </a>
        <a
          href="#"
          className="text-blue-400 hover:text-blue-600 underline pl-6"
        >
          Remove
        </a>
      </td>
    </tr>
  );
};

export default TableRow;
