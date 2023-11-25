{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-panel .books-list',
      bookImage: '.book__image',
    },
  };

  const templates = {
    booksList: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  function render() {
    const listOfBook = document.querySelector(select.containerOf.bookList);
    for (let singleBook of dataSource.books) {
      const HTMLelement = templates.booksList(singleBook);
      const DOMelement = utils.createDOMFromHTML(HTMLelement);
      listOfBook.appendChild(DOMelement);
    }
  }
  const favoriteBooks = [];
  console.log(favoriteBooks);

  function initActions() {
    const listOfBook = document.querySelector(select.containerOf.bookList);
    listOfBook.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {
        const allImages = document.querySelectorAll(
          select.containerOf.bookImage
        );
        for (let image of allImages) {
          const bookId = image.getAttribute('data-id');
          if (!favoriteBooks.includes(bookId)) {
            image.classList.add('favorite');
            favoriteBooks.push(bookId);
          } else {
            const bookIndex = bookId;
            image.classList.remove('favorite');
            favoriteBooks.splice(bookIndex, 1);
          }
        }
      }
    });
  }

  render();
  initActions();
}
