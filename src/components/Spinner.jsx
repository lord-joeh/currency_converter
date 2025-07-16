import React from "react";

const Spinner = ({ size = 32, color = "black" }) => {
  return (
    <svg
      className={`animate-spin`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0a10 10 0 00-10 10h2z"
      />
    </svg>
  );
};

export default Spinner;
