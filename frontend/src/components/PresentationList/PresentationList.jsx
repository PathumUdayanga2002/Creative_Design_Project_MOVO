import React from "react";

const PresentationList = () => {
  return (
    <div className="bg-white p-4  rounded-xl shadow-md shadow-orange-600 font-poppins mt-2">
      <h3 className="text-xl font-semibold">My Presentation List</h3>
      <table className="min-w-full mt-4">
        <thead className="text-left text-sm text-gray-600">
          <tr>
            <th className="py-2">Order</th>
            <th className="py-2">ID</th>
            <th className="py-2">Code</th>
            <th className="py-2">Subject</th>
          </tr>
        </thead>
        <tbody className=" text-[12px]">
          <tr>
            <td className="py-2">01</td>
            <td className="py-2">EC/2021</td>
            <td className="py-2">BECS 112233</td>
            <td className="py-2">Electronics 1AB</td>
          </tr>
          {/* Add more rows as necessary */}
        </tbody>
      </table>
    </div>
  );
};

export default PresentationList;
