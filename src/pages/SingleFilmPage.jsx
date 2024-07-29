import React, { useEffect, useState } from "react";
import Header from "../component/reusables/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import filmImage from "../assets/Film.png";
import { formatDateToShowMonth, hasIdInPath } from "../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/appSlice";
import DetailsLoader from "../component/reusables/loader/DetailsLoader";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import { GoChevronLeft } from "react-icons/go";

const SingleFilmPage = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const hasId = hasIdInPath(location.pathname);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <HeaderLoader />
        <DetailsLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="w-full">
      <Header />
      <div className="w-full p-8">
        {hasId && (
          <div
            className="flex gap-x-1 items-center cursor-pointer mb-6"
            onClick={() => navigate(-1)}
          >
            <GoChevronLeft className="text-primary-gray" />
            <p className="text-sm text-primary-gray">Back</p>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-x-6 h-full">
          <div className="max-w-80 max-h-[450px]">
            <img src={filmImage} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-start items-start w-full max-h-[450px] gap-y-2">
            <p className="mt-10 text-3xl lg:text-5xl font-medium uppercase">
              {film.title}
            </p>
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
