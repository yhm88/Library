const myLibrary = [];

function Book(title, author, pages, isRead) {
  if (!new.target) {
    return new Book(title, author, pages, isRead);
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    returm`${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "have read" : "not read yet"}.`
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);

  displayBooks();
}

function displayBooks() {
  const container = document.querySelector(".container");
  container.innerHTML = '';

  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>author: ${book.author}</p>
      <p>pages: ${book.pages}</p>
      <p>state: ${book.isRead ? 'have read' : 'not read yet'}</p>
      <button class="remove-btn">Remove</button>
    `;

    const removeBtn = bookCard.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    container.appendChild(bookCard);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);

  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Educated", "Tara Westover", 352, false);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 512, true);
addBookToLibrary("The Night Circus", "Erin Morgenstern", 387, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);

const newBookBtn = document.getElementById('new-book-btn');
const bookDialog = document.getElementById('book-dialog');
const bookForm = document.getElementById('book-form');
const closeBtn = document.getElementById('close-btn');

newBookBtn.addEventListener('click', () => {
  bookDialog.showModal();
});

closeBtn.addEventListener('click', () => {
  bookDialog.close();
  bookForm.reset();
});

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, parseInt(pages), read);
  bookDialog.close();
  bookForm.reset();
});