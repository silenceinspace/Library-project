// array where books are stored
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

// 1. Add a “NEW BOOK” button that brings up a form (hide input fields in the first place)

// add new book
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

const addNewBookBtn = document.querySelector("form button");
addNewBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
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
    "unread"
  );
  myLibrary.push(book);
  createCard(book, myLibrary.indexOf(myLibrary[myLibrary.length - 1]));
  trackBookNumber();
  trackReadAndUnreadNumber();

  // clearInputFields();
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

// generate a book card
const displayTitles = document.querySelector(".display-titles");

function createCard(item, index) {
  // remove button
  let removeOne = document.createElement("button");
  removeOne.classList.add("btn-rmv-card");
  removeOne.textContent = "X";
  removeOneBook(removeOne);

  // status of the book
  let bookStatus = document.createElement("button");
  bookStatus.classList.add("btn-card");
  bookStatus.textContent = "Book is not read";
  bookStatus.addEventListener("click", () => {
    bookStatus.textContent = item.toggleStatus(bookStatus);
  });

  let div = document.createElement("div");
  div.classList.add("book");
  div.classList.add("unread");
  div.setAttribute("data-index", index);

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

  div.appendChild(bookStatus);
  div.appendChild(removeOne);
  displayTitles.appendChild(div);
}

// remove one/all books from the library array and on the display
const removeAll = document.querySelector(".remove-all");
removeAll.addEventListener("click", removeAllFromDOM);
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

    // remove a node element + an array item
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
  let nodeList = document.querySelectorAll(`[data-index]`);
  for (let elem of nodeList) {
    elem.setAttribute("data-index", start);
    start += 1;
  }
}

// Update stats about books
const booksNumber = document.querySelector(".book-num");
const unreadNumber = document.querySelector(".unread-num");
const readNumber = document.querySelector(".read-num");

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
    } else if (myLibrary[i].status === "read") {
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


/*
3. Possible improvements:
one function = one action
organize my code
*/
