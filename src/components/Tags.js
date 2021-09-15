import React from "react";
import "twin.macro";

export default function Tags({ tags }) {
  return (
    <div tw='flex justify-end items-center'>
      {tags.map((tag, i) => {
        return (
          <div
            key={i}
            tw='border borderColor[#d7d8de] pl-3 pr-2 ml-2 rounded-sm'
          >
            <p tw='fontSize[10px] uppercase tracking-wider text-ltgray'>
              {tag}
            </p>
          </div>
        );
      })}
    </div>
  );
}
