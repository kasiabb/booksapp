('use strict');
class BooksList {
  constructor() {
    this.data = [];
    this.favoriteBooks = [];
    this.filters = [];
    this.initData();
    this.getElements();
    this.initActions();
    this.render();
  }

  initData() {
    this.data = dataSource.books;
  }
  getElements() {
    this.listOfBooks = document.querySelector('.books-panel .books-list');
    this.filterOfBooks = document.querySelector('.filters');
  }

  initActions() {
    this.listOfBooks.addEventListener(
      'dblclick',
      this.handleBookDoubleClick.bind(this)
    );
    this.filterOfBooks.addEventListener(
      'click',
      this.handleFilterClick.bind(this)
    );
  }

  handleBookDoubleClick(event) {
    event.preventDefault();
    if (event.target.offsetParent.classList.contains('book__image')) {
      const link = event.target.offsetParent;
      const bookId = link.getAttribute('data-id');
      if (this.favoriteBooks.includes(bookId)) {
        const bookIndex = this.favoriteBooks.indexOf(bookId);
        link.classList.remove('favorite');
        this.favoriteBooks.splice(bookIndex, 1);
      } else {
        link.classList.add('favorite');
        this.favoriteBooks.push(bookId);
      }
    }
  }

  handleFilterClick(event) {
    const clickedElement = event.target;

    if (
      clickedElement.tagName == 'INPUT' &&
      clickedElement.type == 'checkbox' &&
      clickedElement.name == 'filter'
    ) {
      if (clickedElement.checked) {
        this.filters.push(clickedElement.value);
      } else {
        const indexOfFilter = this.filters.indexOf(clickedElement.value);
        this.filters.splice(indexOfFilter, 1);
      }
    }
    this.filterBooks();
  }

  filterBooks() {
    for (let book of this.data) {
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
  generateBookHTML(bookData) {
    return `
      <div class="book">
        <div class="book__image" data-id="${bookData.id}">
          <img src="${bookData.image}" alt="${bookData.name}">
        </div>
        <div class="book__info">
          <h2>${bookData.name}</h2>
          <p class="book__price">${bookData.price}</p>
          <div class="book__rating" style="background: ${bookData.ratingBgc}">
            Rating: ${bookData.rating}
          </div>
        </div>
      </div>
    `;
  }
  render() {
    for (let book of this.data) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const generatedHTML = this.generateBookHTML({
        name: book.name,
        price: book.price,
        image: book.image,
        rating: book.rating,
        id: book.id,
        ratingBgc: ratingBgc,
      });

      const elem = this.createDOMFromHTML(generatedHTML);
      this.listOfBooks.appendChild(elem);
    }
  }

  createDOMFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }
}

new BooksList();
