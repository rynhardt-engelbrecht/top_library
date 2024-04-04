class Book {
  static library = [];

  constructor(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.haveRead = haveRead;
  }

  get info() {
    haveReadString = this.haveRead ? "already read" : "not read yet";

    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${haveReadString}.`
  }

  updateReadStatus(haveReadBool) {
    this.haveRead = haveReadBool;
  }

  static addBookToLibrary(title, author, pageCount, haveRead) {
    this.library.push(new Book(title, author, pageCount, haveRead));
  }

  static removeBook(deleteIndex) {
    let updatedLibrary = this.library.filter((book, index) => index != deleteIndex);

    this.library = updatedLibrary;
    displayBooks(this.library);
  }

  static displayBooks() {
    const bookList = document.querySelector('.list-container');
    bookList.innerHTML = '';

    this.library.forEach(book => {
      const newBook = document.createElement('div');
      newBook.classList.add('book-container');
      newBook.setAttribute('book-index', this.library.indexOf(book));

      newBook.appendChild(createInputContainer('Title', 'text', 'book-title', book.title, true));
      newBook.appendChild(createInputContainer('Author', 'text', 'book-author', book.author, true));
      newBook.appendChild(createInputContainer('Pages', 'number', 'page-count', book.pageCount, true));
      const readCheckboxContainer = newBook.appendChild(createInputContainer('Have Read?', 'checkbox', 'have-read', book.haveRead, true));

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = "delete";

      newBook.appendChild(deleteButton);
      deleteButton.addEventListener('click', () => {
        const parentContainer = deleteButton.closest('.book-container');
        removeBook(parentContainer.getAttribute('book-index'));
        displayBooks(myLibrary);
      });

      const haveReadCheckbox = readCheckboxContainer.querySelector('input')
      haveReadCheckbox.addEventListener('change', function() {
        const parentContainer = haveReadCheckbox.closest('.book-container');
        const bookToUpdate = myLibrary[parentContainer.getAttribute('book-index')];

        Book.updateReadStatus(bookToUpdate, haveReadCheckbox.checked);
      });

      bookList.append(newBook);
    });
  }
}

const form = document.querySelector('.append-container form');
form.addEventListener('submit', e => {
  e.preventDefault(); // prevent form submission

  const bookTitleInput = document.querySelector('.append-container form .input-container.book-title input');
  const bookAuthorInput = document.querySelector('.append-container form .input-container.book-author input');
  const bookPagesInput = document.querySelector('.append-container form .input-container.page-count input');
  const bookReadInput = document.querySelector('.append-container form .checkbox-container.have-read input');

  if (bookTitleInput.value === '' || bookAuthorInput.value === '' || bookPagesInput.value === '') {
    alert('Please fill out all fields.');
    return;
  }

  Book.addBookToLibrary(bookTitleInput.value, bookAuthorInput.value, parseInt(bookPagesInput.value), bookReadInput.checked);
  Book.displayBooks(Book.library);
  form.reset()
});

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
  if (inputType == 'checkbox') {
    input.checked = inputValue;
  } else {
    input.value = inputValue;
  }
  input.readOnly = readOnly;

  container.appendChild(label);
  container.appendChild(input);

  return container;
}
