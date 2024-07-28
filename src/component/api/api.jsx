import {
  capitalizeFirstLetters,
  formatDate,
  formatDateCreated,
} from "../../util/utils";

export const fetchPeople = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/people/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.map((person) => ({
      id: person.url.split("/").slice(-2, -1)[0],
      name: person.name,
      birthYear: person.birth_year,
      gender: person.gender,
      hairColor: person.hair_color,
      height: `${person.height} CM`,
      created: person.created,
    }));
  } catch (error) {
    throw error;
  }
};

export const fetchFilms = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/films/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.map((film) => ({
      id: film.episode_id,
      title: film.title,
      releaseDate: film.release_date,
      director: film.director,
      producer: film.producer.split(",")[0].trim(),
      episodeId: film.episode_id,
      character: film.characters[0],
      isChecked: false,
    }));
  } catch (error) {
    throw error;
  }
};
export const fetchStarships = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/starships/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.map((starship) => ({
      id: starship.url.split("/").slice(-2, -1)[0],
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      starshipClass: starship.starship_class,
      isChecked: false,
    }));
  } catch (error) {
    throw error;
  }
};

export const fetchSpecies = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/species/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results.map((species) => ({
      id: species.url.split("/").slice(-2, -1)[0], // Extract ID from URL
      name: capitalizeFirstLetters(species.name),
      classification: capitalizeFirstLetters(species.classification),
      eyeColors: capitalizeFirstLetters(species.eye_colors),
      hairColors: capitalizeFirstLetters(species.hair_colors),
      height: `${species.average_height} CM`,
      created: formatDateCreated(species.created),
      isChecked: false,
    }));
  } catch (error) {
    throw error;
  }
};
