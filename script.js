// 1. Array where books are stored + classObject constructor to creat multiple items with the same properties
let myLibrary = [];

class Book {
  constructor(title, author, pages, id, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.status = status;
  }

  toggleStatus(specificBook) {
    if (this.status === "read") {
      this.status = "unread";
      // closest() method searches for the closest ancestor by selector and returns a node that matches or null
      specificBook.closest(["[data-index]"]).getAttributeNode("class").value =
        "book unread";
      trackReadAndUnreadNumber();
      addBooksToLocalStorage();
      return "Book is not read";
    } else {
      this.status = "read";
      specificBook.closest(["[data-index]"]).getAttributeNode("class").value =
        "book read";
      trackReadAndUnreadNumber();
      addBooksToLocalStorage();
      return "Book is read";
    }
  }
}

// 2. Popup form for input + function to add new books to the array as well as DOM
const formPopUp = document.querySelector(".js-popup-form");
const openPopupForm = document.querySelector(".js-add-book-btn");
openPopupForm.addEventListener("click", changePopupFormView);

function changePopupFormView() {
  if (formPopUp.style.display === "block") {
    formPopUp.classList.add("fade-out");
    setTimeout(() => {
      formPopUp.classList.remove("fade-out");
      formPopUp.style.display = "none";
    }, 700);
  } else {
    formPopUp.style.display = "block";
  }
}

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookStatusRead = document.querySelector("#book-status1");
const bookStatusUnread = document.querySelector("#book-status2");
const popupForm = document.querySelector("form");

function setInitialBookStatus() {
  // "unread" is checked by default, so the book will be created with the unread status if the user doesn't opt for the other option
  if (bookStatusUnread.checked) {
    return bookStatusUnread.value;
  } else return bookStatusRead.value;
}

const createBookBtn = document.querySelector(".js-popup-form__submit-btn");
createBookBtn.addEventListener("click", addBookToLibrary);
function validateForm() {
  if (bookTitle.validity.valueMissing) {
    alert("Book title is missing!");
    return true;
  } else if (bookAuthor.validity.valueMissing) {
    alert("Book author is missing");
    return true;
  } else if (bookPages.validity.valueMissing) {
    alert("Book pages is missing");
    return true;
  }

  if (bookPages.validity.rangeOverflow) {
    alert("Book pages must be of value less than 10000");
    return true;
  }
}

function addBookToLibrary() {
  if (validateForm()) {
    return;
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
  popupForm.reset();
  addBooksToLocalStorage();
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

  // toggleStatus() method is shared through the Book classObject constructor's prototype, prototypal inheritence will help to execute look-ups until a certain method is found
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
  clearLocalStorage();
  addBooksToLocalStorage();
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

    clearLocalStorage();
    addBooksToLocalStorage();
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
trackBookNumber();

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

// 6. Local storage
let localStorageArray = [];
function addBooksToLocalStorage() {
  localStorage.setItem("bookStorage", JSON.stringify(myLibrary));
}

function clearLocalStorage() {
  localStorage.clear();
}

(function getBooksFromLocalStorage() {
  localStorageArray = JSON.parse(localStorage.getItem("bookStorage"));
})();

if (localStorage.length === 0) {
  console.log("No data in local storage yet.");
} else {
  populateMainStorage();
}

function populateMainStorage() {
  for (let i = 0; i < localStorageArray.length; i++) {
    const classObject = localStorageArray[i];
    const book = new Book(
      classObject.title,
      classObject.author,
      classObject.pages,
      myLibrary.length,
      classObject.status
    );
    myLibrary.push(book);
    createCard(book, myLibrary.length - 1);
  }
  trackBookNumber();
  trackReadAndUnreadNumber();
}
