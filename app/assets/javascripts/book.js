class Book {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.author = data.author
    this.year_published = data.year_published
    this.description = data.description
    this.genre = data.genre
    this.average = data.average
    this.book_img_url = data.book_img_url
    this.reviews = data.reviews
  }
  // renderIndexBook() {
  //   return `<a href="/books/${indexBook.id}"><img src"${indexBook.book_img_url}"></a>`
  // }
}

$(function () {

  $.get('/', function (data) {
    idArray = data.map(book => book.id)

    $(".js-next").on("click", function (data) {

      currentBookId = parseInt(data.currentTarget.dataset.id)
      currentIndex = idArray.indexOf(currentBookId);
      $.get(`/books/${idArray[currentIndex + 1]}.json`, function (data) {

        // create new book JS object with AJAX data
        const newBook = new Book(data);
        
        // Update divs with Book object attributes
        $(".book-show").attr('src', newBook.book_img_url)
        $(".title").text(newBook.title);
        $(".author").text(newBook.author);
        $(".average-review-rating").attr("data-score", newBook.average)

        $(".genre").text(newBook.genre.name);
        $(".year-published").text(newBook.year_published);
        $(".description").text(newBook.description);

        // Render reviews
        const reviews = newBook.reviews
        const sortedReviews = reviews.sort((a, b) => a.rating - b.rating)
          
       
        $(".reviews").empty()
        sortedReviews.forEach(function (rev) {
          $(".reviews").append(`<div class="review-rating" data-score="${rev['rating']}"></div>`)
          $(".reviews").append(`<p> ${rev['comment']} </p>`)
        })

        // re-set the id to current on the link
        $(".js-next").attr("data-id", newBook.id);
        nextId = idArray[currentIndex + 1]

        // Raty scripts
        $('.review-rating').raty({
          readOnly: true,
          score: function () {
            return $(this).attr('data-score');
            $('.star-rating').raty('reload')
          },
          path: '/assets'
        });

        $('.average-review-rating').raty({
          readOnly: true,
          score: function () {
            return $(this).attr('data-score')
          },
          path: '/assets'
        });

        $('#rating-form').raty({
          path: '/assets',
          scoreName: 'review[rating]'
        });
      });
    });
  }, 'json');

});
//
  // GET BOOK FROM INDEX PAGE LINK

  // $('div#books a').on('click', function(event) {
  //   event.preventDefault();
  //   //alert('image was clicked!')
  //   const url = $(this).attr('href')
  //   //debugger
  //   $.get(`${url}.json`, function (data) {
  //     const newBook = new Book(data);
  //     //const bookData = data;
  //     $(".book-show").attr('src', newBook.book_img_url)
  //     $(".title").text(newBook.title);
  //     $(".author").text(newBook.author);
  //     $(".average-review-rating").attr("data-score", newBook.average)

  //     $(".genre").text(newBook.genre.name);
  //     $(".year-published").text(newBook.year_published);
  //     $(".description").text(newBook.description);
  //     const reviews = newBook.reviews
  //     $(".reviews").empty()
  //     reviews.forEach(function (rev) {
  //       $(".reviews").append(`<div class="review-rating" data-score="${rev['rating']}"></div>`)
  //       $(".reviews").append(`<p> ${rev['comment']} </p>`)
  //     })
  //   })

  // })
