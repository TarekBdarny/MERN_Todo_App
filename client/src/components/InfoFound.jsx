import React from "react";

const InfoFound = ({ number }) => {
  return (
    <div className="text-xl my-[50px]">
      <p>
        <span className="text-highlight">{number}</span> Todos Found!
      </p>
    </div>
  );
};

export default InfoFound;
