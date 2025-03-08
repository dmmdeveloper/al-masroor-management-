import React from "react";

function Grid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          Item {index + 1}
        </div>
      ))}
    </div>
  );
}
export default Grid;
