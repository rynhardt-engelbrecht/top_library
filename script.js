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

/*
Add a new instance of the Book constructor to the myLibrary array,
with the arguments passed in as attributes.
*/
function addBookToLibrary(title, author, pageCount, haveRead) {
  myLibrary.push(new Book(title, author, pageCount, haveRead));
}

function displayBooks(library) {
  const bookList = document.querySelector('.list-container');

  library.forEach(book => {
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
