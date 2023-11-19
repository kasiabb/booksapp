{
  ('use strict');

  const listOfBooksSelector = '.books-list';

  const templates = {
    booksList: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  function render() {
    const booksListElement = document.querySelector(listOfBooksSelector);

    for (let singleBook of dataSource.books) {
      const HTMLelement = templates.booksList(singleBook);
      const DOMelement = utils.createDOMFromHTML(HTMLelement);
      booksListElement.appendChild(DOMelement);
    }
  }
  const favoriteBooks = [];
  console.log(favoriteBooks);

  function initActions() {
    const booksList = document.querySelector('.books-panel .books-list');

    const booksImages = booksList.querySelectorAll('.book .book__image');
    console.log(booksImages);

    for (let i = 0; i < booksImages.length; i++) {
      const clickedElement = booksImages[i];
      clickedElement.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const bookId = clickedElement.getAttribute('data-id');

        const isBookInFavorites = favoriteBooks.includes(bookId);
        clickedElement.classList.toggle('favorite');
        if (isBookInFavorites) {
          const indexOfBook = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfBook, 1);
        } else {
          favoriteBooks.push(bookId);
        }
      });
    }
  }

  render();
  initActions();
}
