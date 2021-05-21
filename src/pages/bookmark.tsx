import React from "react";
import { Link } from "react-router-dom";

function Bookmark() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center justify-start p-8">
      <div className="w-full lg:w-3xl">
        <Link to="/">
          <h1 className="text-gray-700 font-medium text-3xl">LINE Heute</h1>
        </Link>
        <div className="mt-8">
          <h2 className="text-gray-700 font-medium text-2xl">
            Daftar Bookmark
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
