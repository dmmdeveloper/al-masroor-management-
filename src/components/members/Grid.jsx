import React from "react";
import Card from "./Card";

function Grid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
      {Array.from({ length: 12 }).map((_, index) => (
    <Card index={index}/>
      ))}
    </div>
  );
}
export default Grid;
