import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
import {
  capitalizeFirstLetters,
  formatDateCreated,
  getTableName,
} from "../util/utils";
import Header from "../component/reusables/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import TableLoader from "../component/reusables/loader/TableLoader";
import { useDispatch } from "react-redux";
import { fetchPeople } from "../component/api/api";

const People = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await fetchPeople();
        const transformedData = data.map((person) => ({
          ...person,
          name: capitalizeFirstLetters(person.name),
          gender: capitalizeFirstLetters(person.gender),
          hairColor: capitalizeFirstLetters(person.hairColor),
          created: formatDateCreated(person.created),
        }));
        setRows(transformedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
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

  const handleRoutingToDetailsPage = (id) => {
    localStorage.setItem("activeTab", "/dashboard/people");
    navigate(`/dashboard/people/${id}`);
    dispatch(setActiveTab("/dashboard/people"));
  };

  const headers = [
    { label: "Name", key: "name", width: "w-44" },
    { label: "Birth Year", key: "birthYear", width: "w-32" },
    { label: "Gender", key: "gender", width: "w-32" },
    { label: "Hair Color", key: "hairColor", width: "w-32" },
    { label: "Height", key: "height", width: "w-32" },
    { label: "Created", key: "created", width: "w-52" },
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

export default People;
