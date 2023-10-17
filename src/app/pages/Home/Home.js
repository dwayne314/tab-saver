import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex items-center justify-between h-full text-center">
      <Link
        to="/view-tabs"
        className="flex items-center justify-center w-full h-full hover:bg-slate-300"
      >
        <div className="w-full">View Tabs</div>
      </Link>

      <Link
        to="/save-tabs"
        className="flex items-center justify-center w-full h-full hover:bg-slate-300"
      >
        <div className="w-full">Save Tabs</div>
      </Link>
    </div>
  );
}

export default Home;
