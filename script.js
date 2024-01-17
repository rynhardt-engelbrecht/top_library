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
