import React, { useEffect, useState } from "react";
import Header from "../component/reusables/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import speciesImage from "../assets/Species.png";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/appSlice";
import DetailsLoader from "../component/reusables/loader/DetailsLoader";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";
import { hasIdInPath } from "../util/utils";
import { GoChevronLeft } from "react-icons/go";

const SpeciesDetailsPage = () => {
  const { id } = useParams();
  const [people, setPeople] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasId = hasIdInPath(location.pathname);

  const activeTab = useSelector((state) => state.app.activeTab);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/species/${id}/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPeople(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPeople();
  }, [id]);

  useEffect(() => {
    if (activeTab === "singleStarshipsPage") {
      dispatch(setActiveTab("dashboard"));
    }
  }, []);

  console.log(activeTab, "active tab");

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
            <img src={speciesImage} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-start items-start w-full max-h-[450px] gap-y-2">
            <p className="mt-10 text-3xl lg:text-5xl font-medium uppercase">
              {people.name}
            </p>
            <p className="text-base text-primary-details_color font-medium mt-1 capitalize">
              <span>Designation:</span> {people.designation}
            </p>
            <p className="text-base text-primary-details_color font-medium capitalize">
              <span>Language:</span> {people.language}
            </p>
            <p className="text-base text-primary-details_color font-medium capitalize">
              <span>Eye Colors:</span> {people.eye_colors}
            </p>
            <p className="text-base text-primary-details_color font-medium capitalize">
              <span>Average Lifespan:</span> {people.average_lifespan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetailsPage;
