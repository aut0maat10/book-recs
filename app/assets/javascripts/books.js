$(function() {
  compileIndexBookTemplate();
  // compileShowBookTemplate();
  indexBooks();
  // showBook(); 
});

class Book {
  constructor(attributes){
    this.id = attributes.id
    this.title = attributes.title
    this.author = attributes.author
    this.year_published = attributes.year_published
    this.description = attributes.description
    this.genre_id = attributes.genre_id
    this.average = attributes.average
    this.book_img_url = attributes.book_img_url
    this.reviews = attributes.reviews
  }

  renderIndexBook() {
    return indexBookTemplate(this);
  }
}


// Get all books via AJAX GET request
function indexBooks() {
  var url = window.location.pathname;
  $.get(url, function (data) {
    $.each(data, function (index, book) {
      var indexBook = new Book(book);
      var indexBookRender = indexBook.renderIndexBook();
      $(".books-block").append(indexBookRender);
    });
  }, "json");
}

function compileIndexBookTemplate() {
  indexBookSource = $("#indexBookTemplate").html();
  if (indexBookSource !== undefined) {
    indexBookTemplate = Handlebars.compile(indexBookSource);
  }
}
