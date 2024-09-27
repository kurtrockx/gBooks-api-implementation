"use strict";

class App {
  bookContainer = document.querySelector(".books-container");
  inputBook = document.querySelector("#search-book");
  searchButton = document.querySelector(".search-btn");
  modalBack = document.querySelector(".modal-back");
  loadingIcon = document.querySelector(".loading");
  #hashNewData;
  #modalData;
  #exitModal;
  baseURL = "https://www.googleapis.com/books/v1/volumes/";

  constructor() {
    //search function
    this.searchButton.addEventListener("click", this.spawnBooks.bind(this));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.spawnBooks();
      }
    });
    //checking of hash changes
    this.hashChange();
  }

  getBooks = async (bookTitle) => {
    try {
      const res = await fetch(
        `${this.baseURL}?q=${bookTitle}&maxResults=20&key=AIzaSyD2ZdZSbcdO-o7eH7qc1L_dQce7Xrw4P64`
      );
      if (!res.ok) throw new Error("No books found with that name");
      const data = await res.json();
      return data.items;
    } catch (err) {
      throw err;
    }
  };

  spawnBooks = async function () {
    try {
      this.bookContainer.innerHTML = "";
      this.loadingIcon.classList.remove("gone");
      const bookName = this.inputBook.value;
      const books = await this.getBooks(bookName);

      this.loadingIcon.classList.add("gone");

      books.forEach((book) => {
        const bookInfo = book.volumeInfo;
        const markup = `
            <a href="#${book.id}">
                <div class="book hide">
                    <img src="${bookInfo.imageLinks?.thumbnail}" alt="${
          bookInfo.title
        }" />
                    <div class="title">${bookInfo.title}</div>
                    <div class="author">
                        Author: <span class="author-name">${
                          bookInfo.authors ?? "No author"
                        }</span>
                    </div>
                </div>
            </a>
            `;
        this.bookContainer.insertAdjacentHTML("beforeend", markup);
      });
      document.querySelectorAll(".book").forEach((el, i) => {
        setTimeout(() => {
          el.classList.remove("hide");
        }, i * 100);
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  hashChange() {
    window.addEventListener("hashchange", () => {
      this.#hashNewData = window.location.hash.slice(1);
      this.displayModal();
    });
  }
  getModalData = async () => {
    try {
      const res = await fetch(`${this.baseURL}${this.#hashNewData}`);
      if (!res.ok) throw new Error("No data found from the url");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err.message);
    }
  };
  displayModal = async () => {
    this.#modalData = await this.getModalData();
    this.#modalData = this.#modalData.volumeInfo;
    const markup = `
            <div class="modal">
            <div class="exit">✖</div>
            <div class="title-image">
                <img src="${this.#modalData.imageLinks.thumbnail}" alt="${
      this.#modalData.title
    }" /><span
                >${this.#modalData.title}</span
                >
            </div>
            <div class="description-modal">
                ${this.#modalData.description}
            </div>
            <a href="${
              this.#modalData.infoLink
            }"> <button class="add-to-bookmark">Get this book</button> <a/>
            </div>
        </div>
        `;

    const exit = () => {
      this.modalBack.classList.add("gone");
      this.modalBack.innerHTML = "";
    };

    this.modalBack.insertAdjacentHTML("afterbegin", markup);
    this.modalBack.classList.remove("gone");

    this.#exitModal = document.querySelector(".exit");

    this.#exitModal.addEventListener("click", exit);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") exit();
      return;
    });
  };
}

const app = new App();
