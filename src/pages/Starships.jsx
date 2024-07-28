import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
import { capitalizeFirstLetters, getTableName } from "../util/utils";
import Header from "../component/reusables/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import TableLoader from "../component/reusables/loader/TableLoader";
import { setActiveTab } from "../redux/features/appSlice";
import { useDispatch } from "react-redux";

const Starships = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://swapi.dev/api/starships/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.results.map((ship) => ({
          id: ship.url.split("/")[5],
          name: capitalizeFirstLetters(ship.name),
          model: capitalizeFirstLetters(ship.model),
          class: capitalizeFirstLetters(ship.starship_class),
          passenger: ship.passengers,
          character: ship.films[0],
          length: `${ship.length} Meters`,
        }));
        setRows(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (checked, id) => {
    if (id === "all") {
      setRows(rows.map((row) => ({ ...row, isChecked: checked })));
    } else {
      setRows(
        rows.map((row) =>
          row.id === id ? { ...row, isChecked: checked } : row
        )
      );
    }
  };

  const handleDeleteSelected = () => {
    setRows(rows.filter((row) => !row.isChecked));
  };

  const headers = [
    { label: "Name", key: "name", width: "w-44" },
    { label: "Model", key: "model", width: "w-52" },
    { label: "Class", key: "class", width: "w-52" },
    { label: "Passenger", key: "passenger", width: "w-32" },
    { label: "Length", key: "length", width: "w-32" },
    { label: "Character", key: "character" },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col gap-y-16">
        <HeaderLoader />
        <TableLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableTitle = getTableName(location.pathname);

  const handleRoutingToDetailsPage = (id) => {
    localStorage.setItem("activeTab", "/dashboard/starships");
    navigate(`/dashboard/starships/${id}`);
    dispatch(setActiveTab("/dashboard/starships"));
  };

  return (
    <div className="w-full">
      <Header />
      <div className="w-full px-8">
        <div className="mt-10 flex flex-col gap-y-4">
          <p className="text-base text-primary-gray font-normal">
            {tableTitle}
          </p>
          <Table
            headers={headers}
            rows={rows}
            onCheckboxChange={handleCheckboxChange}
            onDeleteSelected={handleDeleteSelected}
            onRowClick={(id) => handleRoutingToDetailsPage(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Starships;
