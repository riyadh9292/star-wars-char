import React from "react";
import { useNavigate } from "react-router-dom";

export default function CharacterCard({ item }) {
  let navigate = useNavigate();
  let parts = item?.url.split("/");
  let id = parts[parts.length - 2];
  console.log(item);

  return (
    <div
      className="px-4 py-6 cursor-pointer border-2 border-[#e6e6e6] rounded"
      onClick={() => navigate(`/characters/${id}`)}
    >
      <div className="flex items-center gap-4">
        <div>
          <p className="text-[20px] ">
            Name:{" "}
            <span
              title={item.name}
              className="text-red-300 font-bold text-lg hover:underline"
            >
              {item.name.length > 10
                ? item.name.slice(0, 10) + "..."
                : item.name}
            </span>{" "}
          </p>
          <p className="text-[20px] ">
            height:{" "}
            <span
              title={item.height}
              className="text-red-300 font-bold text-lg hover:underline"
            >
              {item.height}
            </span>
          </p>
        </div>
        <div>
          <p className="text-[20px] ">
            Mass:{" "}
            <span
              title={item.mass}
              className="text-red-300 font-bold text-lg hover:underline"
            >
              {item.mass}
            </span>
          </p>
          <p className="text-[20px] ">
            Color:{" "}
            <span
              title={item.skin_color}
              className="text-red-300 font-bold text-lg hover:underline"
            >
              {item.skin_color}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
