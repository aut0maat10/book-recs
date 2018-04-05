class Review {
  constructor(data) {
    this.id = data.id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.userID = data.user.id;
    this.bookID = data.book.id;
  }
}
Review.prototype.renderHTML = function () {
  return `<div class="review-rating" data-score="${this.rating}"></div><p>${this.comment}`
}

// New Review Form Submit
$(function (){
  $('#new_review').submit(function (event) {
    event.preventDefault();
    
    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        // create new review object, pass in data to renderHTML()
        const newReview = new Review(data)
        const reviewHTML = newReview.renderHTML();
        // reset form, append HTML to div
        $("#new_review").trigger("reset");
        $(".reviews").append(reviewHTML)

        // Raty scripts for rendering stars
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
         // End Raty scripts
      },
      error: function (response) {
        alert('error', response);
      }
    });
  })
})