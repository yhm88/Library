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
      <p>stat: ${book.isRead ? 'have read' : 'not read yet'}</p>
    `;

    container.appendChild(bookCard);
  });
}

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Educated", "Tara Westover", 352, false);
addBookToLibrary("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 512, true);
addBookToLibrary("The Night Circus", "Erin Morgenstern", 387, false);
addBookToLibrary("Atomic Habits", "James Clear", 320, false);