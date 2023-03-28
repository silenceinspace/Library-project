// array where books are stored
let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

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
    return alert("Fill in all fields!"); // if there's an empty field, then don't proceed
  }

  let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
  myLibrary.push(book);
  showBooks(book);
  clearInputFields();
  trackBookChanges();

  return myLibrary;
}

function checkIfInputIsEmpty(field) {
  let text = field.value.match(/[\w\d]{2,20}/);
  if (text == null) {
    return true;
  }
}

function clearInputFields() {
  return (
    (bookAuthor.value = ""), (bookTitle.value = ""), (bookPages.value = "")
  );
}

// update info about books
const booksNumber = document.querySelector(".book-num");
const unreadNumber = document.querySelector(".unread-num");
const readNumber = document.querySelector(".read-num");

function trackBookChanges() {
  booksNumber.textContent = `Books: ${myLibrary.length}`;
  unreadNumber.textContent = `Unread: ${myLibrary.length}`;

  readNumber.textContent = `Read: 0`;
}

// display books
function showBooks(item) {
  let div = document.createElement("div");
  div.classList.add("book");

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

  document.querySelector(".display-titles").appendChild(div);
}
