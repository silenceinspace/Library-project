// array where books are stored
let myLibrary = [
  new Book(1984, "Orwell", 250, 0),
  new Book("Harry Potter", "J.K.Rowling", 258, 1),
];

function Book(title, author, pages, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
}

Book.prototype.toggleStatus = function (card) {
  if (this.status === "read") {
    this.status = "unread";
    document.querySelector(`[data-index="${card}"]`).classList.remove("read"); // ?? there can be two data-attibutes with the same number... 
    document.querySelector(`[data-index="${card}"]`).classList.add("unread");
    return "Book is not read";
  } else {
    this.status = "read";
    document.querySelector(`[data-index="${card}"]`).classList.remove("unread");
    document.querySelector(`[data-index="${card}"]`).classList.add("read");
    return "Book is read";
  }
};

// 4. Add a “NEW BOOK” button that brings up a form (hide input fields in the first place)

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
    myLibrary.length
  );
  myLibrary.push(book);
  console.log(`Length: ${myLibrary.length}`);
  console.log(`Causes problem: ${myLibrary.length - 1}`);
  createCard(book, myLibrary.length - 1);
  // clearInputFields();

  console.log(myLibrary); // just visual help for seeing an array
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

myLibrary.forEach(createCard); // initial demonstration of manually set books on an array
console.log(myLibrary); // just visual help for seeing an array
function createCard(item, index) {
  let removeOne = document.createElement("button"); // create a remove button
  removeOne.classList.add("btn-rmv-card");
  removeOne.textContent = "X";
  removeOneBook(removeOne, index);

  // status of the book
  let bookStatus = document.createElement("button");
  bookStatus.classList.add("btn-card");
  bookStatus.textContent = "Book is not read";
  bookStatus.addEventListener("click", () => {
    bookStatus.textContent = item.toggleStatus(index);
  });

  let div = document.createElement("div"); // create a book card
  div.classList.add("book");
  div.classList.add("unread");
  div.setAttribute("data-index", index);

  for (let i = 0; i < 3; i++) {
    // set a book object's key properties on specific paragraphs
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

  div.appendChild(removeOne);
  div.appendChild(bookStatus);
  displayTitles.appendChild(div);
}

// remove one/all books from the library array and on the display
const removeAll = document.querySelector(".remove-all");
removeAll.addEventListener("click", removeFromDOM);
function removeFromDOM() {
  for (let i = 0; i < myLibrary.length; i++) {
    document.querySelector("[data-index]").remove();
  }
  console.log((myLibrary = [])); // just visual help for seeing an array;
  return (myLibrary = []); // remove all books from an array too (assinging to an empty array);
}

function removeOneBook(item, position) {
  item.addEventListener("click", () => {
    let specificCard = document.querySelector(`[data-index="${position}"]`);

    // data-attribute's value is a string
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == specificCard.getAttribute("data-index")) {
        myLibrary.splice([i], 1); // remove a book from an array
        specificCard.remove(); // remove a book from DOM (on the screen)
      }
    }
    console.log(myLibrary); // just visual help for seeing an array
  });
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
