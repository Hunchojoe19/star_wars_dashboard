import React from "react";
import Header from "../component/reusables/header/Header";
import Card from "../component/reusables/card/Card";
import Table from "../component/table/Table";
import { useLocation } from "react-router-dom";
const cardData = [
  { id: 1, title: "Films", background: "#A9FFE0" },
  { id: 2, title: "Starship", background: "#A9C1FF" },
  { id: 3, title: "People", background: "#FFA9EC" },
  { id: 4, title: "Species", background: "#FDFFA9" },
];

const Overview = () => {
  const location = useLocation();
  let tableTitle = "";

  switch (location.pathname) {
    case "/dashboard":
      tableTitle = "Films";
      break;
    case "/starships":
      tableTitle = "Starships";
      break;
    default:
      tableTitle = "";
  }
  return (
    <div className="w-full">
      <Header />
      <div className="mt-10 ml-8 w-[92%] grid grid-cols-1 md:grid-cols-2 md:gap-y-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {cardData.map((card) => (
          <div key={card.id} className="">
            <Card title={card.title} background={card.background} />
          </div>
        ))}
      </div>
      <div className="w-full px-8">
        <div className="mt-10 flex flex-col gap-y-4">
          <p className="text-base text-primary-gray font-normal">
            {tableTitle}
          </p>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Overview;
