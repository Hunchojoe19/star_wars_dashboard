import React, { useEffect, useState } from "react";
import Header from "../component/reusables/header/Header";
import Card from "../component/reusables/card/Card";
import Table from "../component/table/Table";

import { formatDate, getTableName } from "../util/utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../redux/features/appSlice";
import CardLoader from "../component/reusables/loader/CardLoader";
import TableLoader from "../component/reusables/loader/TableLoader";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import { fetchFilms } from "../component/api/api";

const cardData = [
  { id: 1, title: "Films", background: "#A9FFE0", link: "/dashboard" },
  {
    id: 2,
    title: "Starship",
    background: "#A9C1FF",
    link: "/dashboard/starships",
  },
  { id: 3, title: "People", background: "#FFA9EC", link: "/dashboard/people" },
  {
    id: 4,
    title: "Species",
    background: "#FDFFA9",
    link: "/dashboard/species",
  },
];
const Overview = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFilms = async () => {
      try {
        const data = await fetchFilms();
        const transformedData = data.map((film) => ({
          ...film,
          releaseDate: formatDate(film.releaseDate),
        }));
        setRows(transformedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadFilms();
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
    { label: "Film Title", key: "title", width: "w-44" },
    { label: "Release Date", key: "releaseDate", width: "w-32" },
    { label: "Director", key: "director", width: "w-52" },
    { label: "Producer", key: "producer", width: "w-52" },
    { label: "Episode ID", key: "episodeId", width: "w-32" },
    { label: "Character", key: "character" },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col gap-y-16">
        <HeaderLoader />
        <div className="ml-8 flex items-center gap-x-8">
          <CardLoader />
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>

        <TableLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableTitle = getTableName();

  const handlePageLink = (link) => {
    localStorage.setItem("activeTab", link);
    dispatch(setActiveTab(link));
    navigate(link);
  };

  const handleRoutingToASinglePage = (id) => {
    localStorage.setItem("activeTab", "/dashboard");
    navigate(`/dashboard/${id}`);
    dispatch(setActiveTab("/dashboard"));
  };

  return (
    <div className="w-full">
      <Header />
      <div className="mt-10 ml-8 w-[92%] grid grid-cols-1 md:grid-cols-2 md:gap-y-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {cardData.map((card) => (
          <div key={card.id} className="">
            <Card
              title={card.title}
              background={card.background}
              handlePagesRoute={() => {
                handlePageLink(card.link);
              }}
            />
          </div>
        ))}
      </div>
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
            onRowClick={(id) => handleRoutingToASinglePage(id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
