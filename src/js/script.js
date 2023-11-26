{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-panel .books-list',
      bookImage: '.book__image',
      bookFilter: '.filters',
      ratings: '.book__rating__fill',
    },
  };

  const templates = {
    booksList: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  function render() {
    const listOfBook = document.querySelector(select.containerOf.bookList);

    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = determineRatingWidth(book.rating);

      const generatedHTML = templates.booksList({
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        id: book.id,
      });

      const elem = utils.createDOMFromHTML(generatedHTML);
      listOfBook.appendChild(elem);

      const ratingFill = elem.querySelector(select.containerOf.ratings);
      ratingFill.style.width = ratingWidth;
      ratingFill.style.background = ratingBgc;
    }
  }
  const favoriteBooks = [];
  console.log(favoriteBooks);

  function initActions() {
    const listOfBook = document.querySelector(select.containerOf.bookList);
    listOfBook.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {
        const link = event.target.offsetParent;
        const bookId = link.getAttribute('data-id');
        if (favoriteBooks.includes(bookId)) {
          const bookIndex = favoriteBooks.indexOf(bookId);
          link.classList.remove('favorite');
          favoriteBooks.splice(bookIndex, 1);
        } else {
          link.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }
    });
    const filterOfBooks = document.querySelector(select.containerOf.bookFilter);
    filterOfBooks.addEventListener('click', function (callback) {
      const clickedElement = callback.target;
      console.log(clickedElement.value);

      if (
        clickedElement.tagName == 'INPUT' &&
        clickedElement.type == 'checkbox' &&
        clickedElement.name == 'filter'
      ) {
        if (clickedElement.checked) {
          filters.push(clickedElement.value);
        } else {
          const indexOfFilter = filters.indexOf(clickedElement.value);
          filters.splice(indexOfFilter, 1);
        }
      }
      filterBooks();
    });
  }
  const filters = [];
  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      const filterOfHiddenBooks = document.querySelector(
        `${select.containerOf.bookImage}[data-id="${book.id}"]`
      );

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden) {
        filterOfHiddenBooks.classList.add('hidden');
      } else {
        filterOfHiddenBooks.classList.remove('hidden');
      }
    }
  }
  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    } else if (rating < 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating < 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }

  function determineRatingWidth(rating) {
    return rating * 10 + '%';
  }
  render();
  initActions();
}
