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

export const hasIdInPath = (pathname) => {
  const routesWithId = [/\/dashboard\/\d+/, /\/dashboard\/[a-zA-Z0-9-]+\/\d+$/];

  return routesWithId.some((route) => route.test(pathname));
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

export const validateForm = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Email is not valid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!validatePassword(password)) {
    errors.password =
      "Password must be at least 6 characters long and contain both letters and numbers";
  }

  return errors;
};
