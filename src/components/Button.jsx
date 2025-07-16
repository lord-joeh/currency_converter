import React from "react";
import Spinner from "./Spinner";

const Button = ({ value, isLoading = false, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`w-full h-16 flex justify-center items-center rounded-xl text-3xl font-semibold transition-all duration-300 ease-in-out drop-shadow-xl/25 
        ${
          disabled || isLoading
            ? "bg-pink-300 cursor-progress"
            : "bg-pink-500 hover:bg-pink-300 hover:scale-105 cursor-pointer"
        } 
        text-white`}
    >
      {isLoading ? (
        <Spinner size={40} color="white" />
      ) : (
        <p className="text-3xl font-semibold">{value || "Convert"}</p>
      )}
    </button>
  );
};

export default Button;
