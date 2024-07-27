import React, { useEffect, useState } from "react";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([
    // {
    //   id: 1,
    //   title: "A New Hope",
    //   releaseDate: "1977/05/25",
    //   director: "George Lucas",
    //   producer: "Gary Kurtz",
    //   episodeId: 4,
    //   character: "Luke Skywalker",
    //   isChecked: false,
    // },
    // {
    //   id: 2,
    //   title: "The Empire Strikes Back",
    //   releaseDate: "1980/05/21",
    //   director: "Irvin Kershner",
    //   producer: "Gary Kurtz",
    //   episodeId: 5,
    //   character: "Han Solo",
    //   isChecked: false,
    // },
    // {
    //   id: 3,
    //   title: "Return of the Jedi",
    //   releaseDate: "1983/05/25",
    //   director: "Richard Marquand",
    //   producer: "Howard Kazanjian",
    //   episodeId: 6,
    //   character: "Princess Leia",
    //   isChecked: false,
    // },
  ]);

  const handleCheckboxChange = (id) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, isChecked: !row.isChecked } : row
      )
    );
  };

  const handleDeleteSelected = () => {
    setRows(rows.filter((row) => !row.isChecked));
  };

  const getTableData = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Transform data to fit the table structure
        const transformedData = data.results.map((film) => ({
          id: film.episode_id,
          title: film.title,
          releaseDate: film.release_date,
          director: film.director,
          producer: film.producer.split(",")[0].trim(),
          episodeId: film.episode_id,
          character: film.characters[0], // This is just an example; you might want to fetch character details separately
          isChecked: false,
        }));
        setRows(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="w-full border border-primary-gray/40 rounded-md">
      <div className="overflow-y-auto max-h-[589px]">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 border-b w-6">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setRows(
                      rows.map((row) => ({ ...row, isChecked: checked }))
                    );
                  }}
                />
              </th>
              <th className="p-4 border-b w-44 text-sm text-primary-gray text-left">
                Film Title
              </th>
              <th className="p-4 border-b w-32 text-sm text-primary-gray text-left">
                Release Date
              </th>
              <th className="p-4 border-b w-52 text-sm text-primary-gray text-left">
                Director
              </th>
              <th className="p-4 border-b text-sm w-52 text-primary-gray text-left">
                Producer
              </th>
              <th className="p-4 border-b w-32 text-sm text-primary-gray text-left">
                Episode ID
              </th>
              <th className="p-4 border-b text-sm text-primary-gray text-left">
                Character
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b cursor-pointer">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={row.isChecked}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                <td className="p-4 text-sm text-left">{row.title}</td>
                <td className="p-4 text-sm text-left">{row.releaseDate}</td>
                <td className="p-4 text-sm text-left">{row.director}</td>
                <td className="p-4 text-sm text-left">{row.producer}</td>
                <td className="p-4 text-sm text-center">{row.episodeId}</td>
                <td className="p-4 text-sm text-left">{row.character}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {<button
        onClick={handleDeleteSelected}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Delete Selected
      </button>} */}
    </div>
  );
};

export default DataTable;
