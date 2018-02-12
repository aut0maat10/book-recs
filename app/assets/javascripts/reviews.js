class Review {
  constructor(data) {
    this.id = data.id;
    this.rating = data.rating;
    this.comment = data.comment;
    this.user_id = data.user.id;
    this.book_id = data.book.id;
  }
}
Review.prototype.renderHTML = function () {
  return `<div class="review-rating" data-score="${this.rating}"></div><p>${this.comment}`
}

$(function (){
  $('#new_review').submit(function (event) {
    event.preventDefault();
    
    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'json',
      data: $(this).serialize(),
      success: function (data) {
        const newReview = new Review(data)
        const reviewHTML = newReview.renderHTML();
        $("#new_review").trigger("reset");
        $(".reviews").append(reviewHTML)

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
         // End Raty scripts
      },
      error: function (response) {
        alert('error', response);
      }
    });
  })
})