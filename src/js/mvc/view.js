if (module.hot) {
  module.hot.accept();
}

class View {
  bookContainer = document.querySelector(".books-container");
  inputBook = document.querySelector("#search-book");
  searchButton = document.querySelector(".search-btn");
  modalBack = document.querySelector(".modal-back");
  loadingIcon = document.querySelector(".loading");

  searchBook(spawnBooksFunction) {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      spawnBooksFunction();
    });
    this.searchButton.addEventListener("click", spawnBooksFunction);
  }

  _loadingSpinner() {
    this._clear();
    const html = `
      <img src="src/img/loading-icon.png" class="loading" />
    `;
    this.bookContainer.insertAdjacentHTML("afterbegin", html);
  }

  //Display all books data
  insertBooksHTML(books) {
    this._clear();
    books.forEach((book) => {
      const bookInfo = book.volumeInfo;
      const html = `
        <a href="#${book.id}">
          <div class="book hide">
            <img src="${bookInfo.imageLinks?.thumbnail}" alt="${
        bookInfo.title
      }" />
            <div class="title">${bookInfo.title}</div>
              <div class="author">Author:
                <span class="author-name">${
                  bookInfo.authors ?? "No author"
                }</span>
              </div>
          </div>
        </a>
        `;
      this.bookContainer.insertAdjacentHTML("beforeend", html);
    });

    //Delaying the book displays
    this.delayDisplay();
  }

  //Displays the modal data
  insertModalHTML(modelFromModal) {
    const modalData = modelFromModal.volumeInfo;
    const html = `
        <div class="modal">
            <div class="exit-modal">✖</div>
            <div class="title-image">
              <img src="${modalData.imageLinks.thumbnail}" alt="${modalData.title}" /><span
              >${modalData.title}</span>
            </div>
            <div class="description-modal">
                ${modalData.description}
            </div>
              <a href="${modalData.infoLink}"> <button class="add-to-bookmark">Get this book</button> <a/>
            </div>
        </div>
        `;

    this.modalBack.insertAdjacentHTML("afterbegin", html);
    this.modalBack.classList.remove("gone");

    //Ways to exit the modal
    document
      .querySelector(".exit-modal")
      .addEventListener("click", this.modalExit.bind(this));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      this.modalExit();
    });
    this.modalBack.addEventListener("click", this.modalExit.bind(this));

    //Prevent modal closing when clicked on
    document.querySelector(".modal").addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  //Modal exit button
  modalExit() {
    this.modalBack.classList.add("gone");
    this.modalBack.innerHTML = "";
  }

  //Display each book one after the other
  delayDisplay() {
    document.querySelectorAll(".book").forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("hide");
      }, i * 100);
    });
  }

  //Listens for hash changes and returns it
  hashChange(hashFunction) {
    window.addEventListener("hashchange", hashFunction);
  }

  //Clears the bookContainer class
  _clear() {
    this.bookContainer.innerHTML = "";
  }
}

export default new View();
