import React from "react";

export default function Pagination({ active, total, setActive }) {
  const totalBlock = [...Array(total).keys()];

  return (
    <div className="flex justify-center w-full gap-4">
      {totalBlock.map((val, key) => (
        <p
          key={key}
          className={` cursor-pointer p-3 rounded  ${
            active === val + 1
              ? " text-white bg-slate-700"
              : " text-slate-700 bg-white border border-[#e6e6e6]"
          } `}
          onClick={() => setActive(val + 1)}
        >
          {val + 1}
        </p>
      ))}
    </div>
  );
}
