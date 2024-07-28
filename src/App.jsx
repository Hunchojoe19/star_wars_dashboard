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
import Starships from "./pages/Starships";
import People from "./pages/People";
import Species from "./pages/Species";
import SingleFilmPage from "./pages/SingleFilmPage";
import StarshipsDetailsPage from "./pages/StarshipsDetailsPage";
import PeopleDetailsPage from "./pages/PeopleDetailsPage";
import SpeciesDetailsPage from "./pages/SpeciesDetailsPage";
import Login from "./pages/Login";

function App() {
  return (
    <div className="w-full">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="starships" element={<Starships />} />
            <Route path="people" element={<People />} />
            <Route path="species" element={<Species />} />
            <Route path="/dashboard/:id" element={<SingleFilmPage />} />
            <Route
              path="/dashboard/starships/:id"
              element={<StarshipsDetailsPage />}
            />
            <Route
              path="/dashboard/people/:id"
              element={<PeopleDetailsPage />}
            />
            <Route
              path="/dashboard/species/:id"
              element={<SpeciesDetailsPage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
