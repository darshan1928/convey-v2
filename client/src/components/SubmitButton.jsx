import React from "react";

const SubmitButton = ({ text, isLoading, ...props }) => {
  return (
    <button
      type="submit"
      className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <span className="loader"></span> : text}
    </button>
  );
};

export default SubmitButton;
