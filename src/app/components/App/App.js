import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import Home from "../../pages/Home/Home";
import ViewTabs from "../../pages/ViewTabs/ViewTabs";
import SaveTabs from "../../pages/SaveTabs/SaveTabs";

function App() {
  return (
    <div className="flex flex-col h-[600px] w-[400px] bg-slate-200">
      <header>
        <Header />
      </header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/view-tabs" element={<ViewTabs />}></Route>
        <Route path="/save-tabs" element={<SaveTabs />}></Route>
      </Routes>
    </div>
  );
}

export default App;
