const myLibrary = [];

function Book(title, author, pageCount, haveRead) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.haveRead = haveRead;
}

Book.prototype.info = function() {
  haveReadString = this.haveRead ? "already read" : "not read yet";

  return `${this.title} by ${this.author}, ${this.pageCount} pages, ${haveReadString}.`
};

const addBookButton = document.querySelector('.append-container form input[type="submit"]');
addBookButton.addEventListener('click', e => {
  const bookTitleInput = document.querySelector('.append-container form .input-container.book-title input');
  const bookAuthorInput = document.querySelector('.append-container form .input-container.book-author input');
  const bookPagesInput = document.querySelector('.append-container form .input-container.page-count input');
  const bookReadInput = document.querySelector('.append-container form .checkbox-container.have-read input');

  if (bookTitleInput.value === '' || bookAuthorInput.value === '' || bookPagesInput.value === '') {
    alert('Please fill out all fields.');
    e.preventDefault(); // Prevent form submission
    return;
  }

  addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, parseInt(bookPagesInput.value), bookReadInput.checked);
  displayBooks(myLibrary);

  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookPagesInput.value = '';
  bookReadInput.checked = false;

  e.preventDefault(); // prevent form submission
});

/*
Add a new instance of the Book constructor to the myLibrary array,
with the arguments passed in as attributes.
*/
function addBookToLibrary(title, author, pageCount, haveRead) {
  myLibrary.push(new Book(title, author, pageCount, haveRead));
}

function displayBooks(library) {
  const bookList = document.querySelector('.list-container');
  bookList.innerHTML = '';

  library.forEach(book => {
    const newBook = document.createElement('div');
    newBook.classList.add('book-container');

    newBook.appendChild(createInputContainer('Title', 'text', 'book-title', book.title, true));
    newBook.appendChild(createInputContainer('Author', 'text', 'book-author', book.author, true));
    newBook.appendChild(createInputContainer('Pages', 'number', 'page-count', book.pageCount, true));

    const haveReadContainer = document.createElement('div');
    haveReadContainer.classList.add('input-container', 'have-read');

    haveReadContainer.appendChild(createInputContainer('Have Read?', 'checkbox', 'have-read', '', true));
    const haveReadInput = haveReadContainer.querySelector('input');
    haveReadInput.checked = book.haveRead;

    newBook.appendChild(haveReadContainer);

    bookList.append(newBook);
  });
}

function createInputContainer(labelText, inputType, inputName, inputValue, readOnly) {
  const container = document.createElement('div');
  container.classList.add('input-container');
  container.classList.add(inputName);

  const label = document.createElement('label');
  label.setAttribute('for', inputName);
  label.textContent = labelText;

  const input = document.createElement('input');
  input.setAttribute('type', inputType);
  input.setAttribute('name', inputName);
  input.setAttribute('id', inputName);
  input.value = inputValue;
  input.readOnly = readOnly;

  container.appendChild(label);
  container.appendChild(input);

  return container;
}
