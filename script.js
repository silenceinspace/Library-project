let myLibrary = [];
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  // this.read = read;
}

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
// };

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");

const addNewBookBtn = document.querySelector('[type="button"]');
addNewBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPages.value;

  if (title != "" && author != "" && pages != "") {
    let book = new Book(title, author, pages);
    myLibrary.push(book);
    console.log(myLibrary);
    clearInputFields();

    return myLibrary;
  } else {
    console.log("Fill in all info!");
  }
}

function clearInputFields() {
  return (
    (bookAuthor.value = ""), (bookTitle.value = ""), (bookPages.value = "")
  );
}
