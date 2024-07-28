export const formatDate = (dateString) => {
  return dateString.replace(/-/g, "/");
};

export const getTableName = () => {
  let tableName = "";
  const pathname = window.location.pathname;
  if (pathname === "/dashboard") {
    tableName = "Film";
  } else if (pathname === "/dashboard/starships") {
    tableName = "Starships";
  } else if (pathname === "/dashboard/people") {
    tableName = "People";
  } else if (pathname === "/dashboard/species") {
    tableName = "Species";
  }
  return tableName;
};

export const capitalizeFirstLetters = (string) => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const formatDateCreated = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateToShowMonth = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
};
