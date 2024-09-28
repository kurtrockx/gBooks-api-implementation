import { API_URL } from "../config.js";
import { API_KEY } from "../config.js";
import { MAX_RESULTS } from "../config.js";

//Recieves books data from API
export const getBooks = async (bookTitle) => {
  try {
    const res = await fetch(
      `${API_URL}?q=${bookTitle}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
    );
    if (!res.ok) throw new Error("No books found with that name");
    const data = await res.json();
    return data.items;
  } catch (err) {
    throw err;
  }
};

//Retrieves a single books data for the modal
export const getModalData = async (newBookId) => {
  try {
    const res = await fetch(`${API_URL}${newBookId}`);
    if (!res.ok) throw new Error("No data found from the url");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
