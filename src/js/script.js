('use strict');

const select = {
  templateOf: {
    booksProduct: '#template-book',
  },
  containerOf: {
    books: '.books-list',
    images: '.book__image',
    filters: '.filters',
  },
};
const templates = {
  templateBooks: Handlebars.compile(
    document.querySelector(select.templateOf.booksProduct).innerHTML
  ),
};
class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.data = [];
    thisBooksList.favoriteBooks = [];
    thisBooksList.filters = [];
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.initActions();
    thisBooksList.render();
  }

  initData() {
    const thisBookList = this;
    thisBookList.data = dataSource.books;
  }
  getElements() {
    const thisBooksList = this;
    thisBooksList.listOfBooks = document.querySelector(
      '.books-panel .books-list'
    );
    thisBooksList.filterOfBooks = document.querySelector('.filters');
  }

  initActions() {
    const thisBooksList = this;
    thisBooksList.listOfBooks.addEventListener('dblclick', function (event) {
      thisBooksList.handleBookDoubleClick(event);
    });

    thisBooksList.filterOfBooks.addEventListener('click', function (event) {
      thisBooksList.handleFilterClick(event);
    });
  }

  handleBookDoubleClick(event) {
    event.preventDefault();
    const thisBookList = this;
    if (event.target.offsetParent.classList.contains('book__image')) {
      const link = event.target.offsetParent;
      const bookId = link.getAttribute('data-id');
      if (thisBookList.favoriteBooks.includes(bookId)) {
        const bookIndex = this.favoriteBooks.indexOf(bookId);
        link.classList.remove('favorite');
        thisBookList.favoriteBooks.splice(bookIndex, 1);
      } else {
        link.classList.add('favorite');
        thisBookList.favoriteBooks.push(bookId);
      }
    }
  }

  handleFilterClick(event) {
    const thisBooksList = this;
    const clickedElement = event.target;

    if (
      clickedElement.tagName == 'INPUT' &&
      clickedElement.type == 'checkbox' &&
      clickedElement.name == 'filter'
    ) {
      if (clickedElement.checked) {
        thisBooksList.filters.push(clickedElement.value);
      } else {
        const indexOfFilter = this.filters.indexOf(clickedElement.value);
        thisBooksList.filters.splice(indexOfFilter, 1);
      }
    }
    thisBooksList.filterBooks();
  }

  filterBooks() {
    const thisBooksList = this;
    for (let book of thisBooksList.data) {
      let shouldBeHidden = false;
      const filterOfHiddenBooks = document.querySelector(
        `.book__image[data-id="${book.id}"]`
      );

      for (const filter of this.filters) {
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

  determineRatingBgc(rating) {
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

  render() {
    const thisBooksList = this;
    for (let book of thisBooksList.data) {
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const generatedHTML = templates.templateBooks({
        id: book.id,
        name: book.name,
        price: book.price,
        rating: book.rating,
        image: book.image,
        details: book.details.adults,
        nonFiction: book.details.nonFiction,
        ratingBgc: ratingBgc,
        ratingWidth: ratingWidth,
      });
      const element = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.listOfBooks.appendChild(element);
    }
  }

  createDOMFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
}

new BooksList();
