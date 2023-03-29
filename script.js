// array where books are stored
let myLibrary = [
  new Book(1984, "Orwell", 250),
  new Book("Harry Potter", "J.K.Rowling", 258),
];

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
    return alert("Fill in all fields!");
  }

  let book = new Book(bookTitle.value, bookAuthor.value, bookPages.value);
  myLibrary.push(book);
  createCard(book);
  console.log(myLibrary);
  // clearInputFields();
}

function checkIfInputIsEmpty(field) {
  if (field.value === "") {
    console.log("empty field");
    return true;
  }
}

function clearInputFields() {
  bookAuthor.value = "";
  bookTitle.value = "";
  bookPages.value = "";
}

// remove nodes from DOM
const removeAll = document.querySelector(".remove-all");
removeAll.addEventListener("click", removeFromDOM);
function removeFromDOM() {
  for (let i = 0; i < myLibrary.length; i++) {
    let child = document.querySelector(".display-titles > div");
    console.log(`${child} ${[i]}`);
    child.remove();
  }
  return (myLibrary = []);
}

// generate a book card
const displayTitles = document.querySelector(".display-titles");
myLibrary.forEach(createCard);
function createCard(item) {
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
  displayTitles.appendChild(div);
}

// update info about books

// const booksNumber = document.querySelector(".book-num");
// const unreadNumber = document.querySelector(".unread-num");
// const readNumber = document.querySelector(".read-num");

// function trackBookChanges() {
//   booksNumber.textContent = `Books: ${myLibrary.length}`;
//   unreadNumber.textContent = `Unread: ${myLibrary.length}`;

//   readNumber.textContent = `Read: 0`;
// }
