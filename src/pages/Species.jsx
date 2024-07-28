import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  capitalizeFirstLetters,
  formatDateCreated,
  getTableName,
} from "../util/utils";
import Header from "../component/reusables/header/Header";
import Table from "../component/table/Table";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import TableLoader from "../component/reusables/loader/TableLoader";
import { useDispatch } from "react-redux";

const Species = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://swapi.dev/api/species/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const transformedData = data.results.map((species) => ({
          id: species.url.split("/").slice(-2, -1)[0],
          name: capitalizeFirstLetters(species.name),
          classification: capitalizeFirstLetters(species.classification),
          eyeColors: capitalizeFirstLetters(species.eye_colors),
          hairColors: capitalizeFirstLetters(species.hair_colors),
          height: `${
            species.average_height !== "n/a"
              ? species.average_height + " CM"
              : "N/A"
          }`,
          created: formatDateCreated(species.created),
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
    { label: "Classification", key: "classification", width: "w-32" },
    { label: "Eye Colors", key: "eyeColors", width: "w-52" },
    { label: "Hair Colors", key: "hairColors", width: "w-52" },
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

  const handleRoutingToDetailsPage = (id) => {
    localStorage.setItem("activeTab", "/dashboard/species");
    navigate(`/dashboard/species/${id}`);
    dispatch(setActiveTab("/dashboard/species"));
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

export default Species;
