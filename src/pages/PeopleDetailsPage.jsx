import React, { useEffect, useState } from "react";
import Header from "../component/reusables/header/Header";
import { useParams } from "react-router-dom";
import peopleImage from "../assets/People.png";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/appSlice";
import DetailsLoader from "../component/reusables/loader/DetailsLoader";
import HeaderLoader from "../component/reusables/loader/HeaderLoader";

const PeopleDetailsPage = () => {
  const { id } = useParams();
  const [people, setPeople] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.app.activeTab);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
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
        <div className="flex gap-x-6 h-full">
          <div className="max-w-80 max-h-[450px]">
            <img src={peopleImage} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-start items-start w-full max-h-[450px] gap-y-2">
            <p className="mt-10 text-5xl font-medium uppercase">
              {people.name}
            </p>
            <p className="text-base text-primary-details_color font-medium mt-1 capitalize">
              <span>Gender:</span> {people.gender}
            </p>
            <p className="text-base text-primary-details_color font-medium">
              <span>Year of birth:</span> {people.birth_year}
            </p>
            <p className="text-base text-primary-details_color font-medium capitalize">
              <span>Skin Color:</span> {people.skin_color}
            </p>
            <p className="text-base text-primary-details_color font-medium">
              <span>Height:</span> {`${people.height} CM`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
