// array where books are stored
let myLibrary = [
  new Book(1984, "George Orwell", 320),
  new Book("Kobzar", "Taras Shevcenko", 194),
  new Book("Sherlock Holmes", "Artur Konan Doile", 187),
];

// object constructor
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages.`;
};

// get DOM nodes of the input fields
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

// clear fill fields for new input
function clearInputFields() {
  return (
    (bookAuthor.value = ""), (bookTitle.value = ""), (bookPages.value = "")
  );
}

// add new book
const addNewBookBtn = document.querySelector('[type="button"]');
addNewBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;

  // if fields are NOT empty, then create an instance of the book constructor and push into the library
  if (title != "" && author != "" && pages != "") {
    let book = new Book(title, author, pages);
    myLibrary.push(book);
    showBooks(book);
    clearInputFields();

    return myLibrary;
  } else {
    console.log("Fill in all info!");
  }
}

// display books
myLibrary.forEach(showBooks);
function showBooks(item) {
  let node = document.createElement("p");
  let textNode = document.createTextNode("- " + item.info());
  node.appendChild(textNode);
  node.classList.add("book");
  document.querySelector(".display-titles").appendChild(node);
}
