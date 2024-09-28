import view from "./view.js";
import * as model from "./model.js";

//Displaying the books
const spawnBooks = async function () {
  try {
    view._loadingSpinner();
    //Gets data from the view
    const bookName = view.inputBook.value;

    //Gets data from the model
    const books = await model.getBooks(bookName);

    //Displays books from the view
    view.insertBooksHTML(books);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

//Displaying the modal
const spawnModal = async function () {
  const id = window.location.hash.slice(1);
  const modalData = await model.getModalData(id);
  view.insertModalHTML(modalData);
};

const init = function () {
  view.searchBook(spawnBooks);
  view.hashChange(spawnModal);
};

if (module.hot) {
  module.hot;
}
init();
