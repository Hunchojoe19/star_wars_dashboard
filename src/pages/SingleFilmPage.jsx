import React, { useEffect, useState } from "react";
import Header from "../component/reusables/header/Header";
import { useParams } from "react-router-dom";
import filmImage from "../assets/Film.png";
import { formatDateToShowMonth } from "../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/appSlice";

const SingleFilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.app.activeTab);

  useEffect(() => {
    fetch(`https://swapi.dev/api/films/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFilm(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (activeTab === "singleFilmPage") {
      dispatch(setActiveTab("dashboard"));
    }
  }, []);

  console.log(activeTab, "active tab");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-full">
      <Header />
      <div className="w-full p-8">
        <div className="flex gap-x-6 h-full">
          <div className="max-w-80 max-h-[450px] bg-yellow-600">
            <img src={filmImage} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-start items-start w-full max-h-[450px] gap-y-2">
            <p className="mt-10 text-5xl font-medium uppercase">{film.title}</p>
            <p className="text-base text-primary-details_color font-medium mt-1">
              <span>Director:</span> {film.director}
            </p>
            <p className="text-base text-primary-details_color font-medium">
              <span>Producer:</span> {film.producer}
            </p>
            <p className="text-base text-primary-details_color font-medium">
              <span>Release Date:</span>{" "}
              {formatDateToShowMonth(film.release_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFilmPage;
