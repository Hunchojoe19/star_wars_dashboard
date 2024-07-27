import React from "react";
import Header from "../component/reusables/header/Header";
import Card from "../component/reusables/card/Card";

const cardData = [
  { id: 1, title: "Films", background: "#A9FFE0" },
  { id: 2, title: "Starship", background: "#A9C1FF" },
  { id: 3, title: "People", background: "#FFA9EC" },
  { id: 4, title: "Species", background: "#FDFFA9" },
];

const Overview = () => {
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
    </div>
  );
};

export default Overview;
