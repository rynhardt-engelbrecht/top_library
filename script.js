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

  /*
  This static method receives a reference to the book that needs to be updated, then
  directly changes the book's haveRead attribute.
  */
  static updateReadStatus(bookToUpdate, haveReadBool) {
    bookToUpdate.haveRead = haveReadBool;
  }

  static addBookToLibrary(title, author, pageCount, haveRead) {
    this.library.push(new Book(title, author, pageCount, haveRead));
  }

  /*
  This method removes a book at a given index from the library, by filtering
  every book that is *not* at the index to be deleted into a separate 'updatedLibrary'
  array, then sets the static library field to the updatedLibrary variable.
  */
  static removeBook(deleteIndex) {
    let updatedLibrary = this.library.filter((book, index) => index != deleteIndex);

    this.library = updatedLibrary;
    this.displayBooks(this.library);
  }

  /*
  This method displays the book in the library static field, by looping through
  every book in the array, and for every element creating a set of HTML elements to add to
  the DOM.
  */
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
        Book.removeBook(parentContainer.getAttribute('book-index'));
        Book.displayBooks(Book.library);
      });

      const haveReadCheckbox = readCheckboxContainer.querySelector('input')
      haveReadCheckbox.addEventListener('change', function() {
        const parentContainer = haveReadCheckbox.closest('.book-container');
        const bookToUpdate = Book.library[parentContainer.getAttribute('book-index')];

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

  if (bookTitleInput.validity.valueMissing ||
      bookAuthorInput.validity.valueMissing ||
      bookPagesInput.validity.valueMissing) {
    alert('Please fill out all fields.');
    return;
  } else if (bookPagesInput.validity.rangeUnderflow) {
    alert('Page count can\'t be less than 1');
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
