import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./component/reusables/logo/Logo";
import Header from "./component/reusables/header/Header";
import SideTab from "./component/sidetab/SideTab";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import DashboardLayout from "./component/dashboard/DashboardLayout";

function App() {
  return (
    <div className="w-full">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
