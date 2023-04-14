// 1. Array where books are stored + object constructor to creat multiple items with the same properties
let myLibrary = [];

function Book(title, author, pages, id, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.status = status;
}

Book.prototype.toggleStatus = function (specificBook) {
  if (this.status === "read") {
    this.status = "unread";
    // closest() method searches for the closest ancestor by selector and returns a node that matches or null
    specificBook.closest(["[data-index]"]).getAttributeNode("class").value =
      "book unread";
    trackReadAndUnreadNumber();
    return "Book is not read";
  } else {
    this.status = "read";
    specificBook.closest(["[data-index]"]).getAttributeNode("class").value =
      "book read";
    trackReadAndUnreadNumber();
    return "Book is read";
  }
};

// 2. Popup form for input + function to add new books to the array as well as DOM
const formPopUp = document.querySelector(".js-popup-form");
const openPopupForm = document.querySelector(".js-add-book-btn");
openPopupForm.addEventListener("click", changePopupFormView);

function changePopupFormView() {
  if (formPopUp.style.display === "block") {
    formPopUp.style.display = "none";
  } else {
    formPopUp.style.display = "block";
  }
}

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatusRead = document.querySelector("#book-status1");
const bookStatusUnread = document.querySelector("#book-status2");

function setInitialBookStatus() {
  // "unread" is checked by default, so the book will be created with the unread status if the user doesn't opt for the other option
  if (bookStatusUnread.checked) {
    return bookStatusUnread.value;
  } else return bookStatusRead.value;
}
const createBookBtn = document.querySelector(".js-popup-form__submit-btn");
createBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e) {
  // preventDefault() does not allow a button inside a form element to submit data to a server, instead it is possible to make the button behave just like a regular button
  e.preventDefault();
  if (
    checkIfInputIsEmpty(bookTitle) ||
    checkIfInputIsEmpty(bookAuthor) ||
    checkIfInputIsEmpty(bookPages)
  ) {
    return alert("Fill in all fields!");
  }

  let book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    myLibrary.length,
    setInitialBookStatus()
  );

  myLibrary.push(book);
  createCard(book, myLibrary.length - 1);

  // Update books' numbers while the library is being increased
  trackBookNumber();
  trackReadAndUnreadNumber();
  changePopupFormView();
  clearInputFields();
}

function checkIfInputIsEmpty(field) {
  if (field.value === "") {
    return true;
  }
}

function clearInputFields() {
  bookAuthor.value = "";
  bookTitle.value = "";
  bookPages.value = "";
}

// 3. Create elements in DOM that are not in HTML but are necessary
const displayTitles = document.querySelector(".js-display-section");

function createCard(item, index) {
  // card div
  let div = document.createElement("div");
  div.classList.add("book");
  div.classList.add(item.status);
  // Set data-index attributes on divs with indexes corresponding to array items' indexes. It is important to associate a specific div with a specific book item in the array that will be removed at the same time
  div.setAttribute("data-index", index);
  displayTitles.appendChild(div);

  for (let i = 0; i < 3; i++) {
    let para = document.createElement("p");
    if (i == 0) {
      para.textContent = `"${item.title}"`;
    } else if (i == 1) {
      para.textContent = `by: ${item.author}`;
    } else if (i == 2) {
      para.textContent = `pages: ${item.pages}`;
    }
    div.appendChild(para);
  }

  // remove button
  let removeOne = document.createElement("button");
  removeOne.classList.add("btn-rmv-card");
  removeOne.textContent = "X";
  div.appendChild(removeOne);
  removeOneBook(removeOne);

  // book status
  let bookStatus = document.createElement("button");
  bookStatus.classList.add("btn-card");
  if (item.status === "read") {
    bookStatus.textContent = "Book is read";
  } else {
    bookStatus.textContent = "Book is not read";
  }
  div.appendChild(bookStatus);

  // toggleStatus() method is shared through the Book object constructor's prototype, prototypal inheritence will help to execute look-ups until a certain method is found
  bookStatus.addEventListener("click", () => {
    bookStatus.textContent = item.toggleStatus(bookStatus);
  });
}

// 4. Remove one or all books from the array and DOM
const removeAll = document.querySelector(".js-remove-all");
removeAll.addEventListener("click", () => {
  // Make sure the user is actually willing to clear the whole library
  if (confirm("Are you sure about removing all books from the library?")) {
    removeAllFromDOM();
  } else return;
});

function removeAllFromDOM() {
  for (let i = 0; i < myLibrary.length; i++) {
    document.querySelector("[data-index]").remove();
  }
  myLibrary = [];
  resetStatsToZero();
}

function removeOneBook(item) {
  item.addEventListener("click", () => {
    let specificCard = item
      .closest("[data-index]")
      .getAttributeNode("data-index").value;

    // remove a node element with DOM parentElement property + splice (=throw away) a specific book item from the array
    // equality is non-strict because the id property is "number" whereas the data-index's value is "string"
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == specificCard) {
        myLibrary.splice([i], 1);
        item.parentElement.remove();
      }
    }

    updateIndexes();
    trackBookNumber();
    trackReadAndUnreadNumber();
    resetStatsToZero();
  });
}

function updateIndexes() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].id = i;
  }

  let start = 0;
  // Loop over a node list with data-index attributes to keep them relevant to the book items' ids every time a book item is removed
  let nodeList = document.querySelectorAll(`[data-index]`);
  for (let elem of nodeList) {
    elem.setAttribute("data-index", start);
    start += 1;
  }
}

// 5. Update stats about books
const booksNumber = document.querySelector(".js-book-num");
const unreadNumber = document.querySelector(".js-unread-num");
const readNumber = document.querySelector(".js-read-num");

function trackBookNumber() {
  booksNumber.textContent = `Books: ${myLibrary.length}`;
}

function trackReadAndUnreadNumber() {
  let unread = 0;
  let read = 0;

  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].status === "unread") {
      unread += 1;
      unreadNumber.textContent = `Unread: ${unread}`;
      readNumber.textContent = `Read: ${read}`;
    } else {
      read += 1;
      readNumber.textContent = `Read: ${read}`;
      unreadNumber.textContent = `Unread: ${unread}`;
    }
  }
}

function resetStatsToZero() {
  if (myLibrary.length === 0) {
    booksNumber.textContent = "Books: 0";
    unreadNumber.textContent = "Unread: 0";
    readNumber.textContent = "Read: 0";
  } else return;
}
