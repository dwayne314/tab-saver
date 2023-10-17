import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="text-center bg-slate-400">
      <Link to="/" className="block w-full h-full py-2 hover:text-white">
        Tab Saver
      </Link>
    </div>
  );
}

export default Header;
