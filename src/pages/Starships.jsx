// import React, { useEffect, useState } from "react";
// import Table from "../component/table/Table";
// import { getTableName } from "../util/utils";
// import Header from "../component/reusables/header/Header";

// const Starships = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     fetch("https://swapi.dev/api/starships/")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const transformedData = data.results.map((film) => ({
//           id: film.model,
//           name: film.name,
//           model: film.model,
//           class: film.starship_class,
//           passenger: film.passengers,
//           character: film.characters[0],
//           length: film.length,
//         }));
//         setRows(transformedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   const handleCheckboxChange = (checked, id) => {
//     if (id === "all") {
//       setRows(rows.map((row) => ({ ...row, isChecked: checked })));
//     } else {
//       setRows(
//         rows.map((row) =>
//           row.id === id ? { ...row, isChecked: checked } : row
//         )
//       );
//     }
//   };

//   const handleDeleteSelected = () => {
//     setRows(rows.filter((row) => !row.isChecked));
//   };

//   const headers = [
//     { label: "Name", key: "name", width: "w-44" },
//     { label: "Length", key: "length", width: "w-32" },
//     { label: "Model", key: "model", width: "w-52" },
//     { label: "Class", key: "class", width: "w-52" },
//     { label: "Passenger", key: "passenger", width: "w-32" },
//     { label: "Character", key: "character" },
//   ];

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const tableTitle = getTableName();
//   return (
//     <div className="w-full">
//       <Header />

//       <div className="w-full px-8">
//         <div className="mt-10 flex flex-col gap-y-4">
//           <p className="text-base text-primary-gray font-normal">
//             {tableTitle}
//           </p>
//           <Table
//             headers={headers}
//             rows={rows}
//             onCheckboxChange={handleCheckboxChange}
//             onDeleteSelected={handleDeleteSelected}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Starships;
import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
import { capitalizeFirstLetters, getTableName } from "../util/utils";
import Header from "../component/reusables/header/Header";
import { useLocation } from "react-router-dom";

const Starships = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

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
          id: ship.model,
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
    return <div>Loading...</div>;
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
          />
        </div>
      </div>
    </div>
  );
};

export default Starships;
