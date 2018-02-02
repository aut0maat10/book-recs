// function Review(attributes){
//   this.id = attributes.id;
//   this.rating = attributes.rating;
//   this.comment = attributes.comment; 
// }

// Review.success = function(json) {
//   var review = new Review(json);
//   var reviewHTML = review.renderHTML(); 
//   $("#new_review").trigger("reset");
//   $('div.reviews').append(reviewHTML)
 
//   console.log(review)

  

// }
// Review.error = function (response) {
//   console.log("Yu broke it?", response)
// }


// Review.ready = (function () {
//   Review.templateSource = $('#review-template').html();
//   Review.template = Handlebars.compile(Review.templateSource);
// })

// Review.prototype.renderHTML = function(){
//   return Review.template(this)
// }

// $(function () {
//   Review.ready()

//   $('form#new_review').submit(function (e) {
//     e.preventDefault();
//     const $form = $(this);
//     const action = $form.attr('action');
//     const params = $form.serialize();

//     $.ajax({
//       url: action,
//       data: params,
//       dataType: "json",
//       method: "POST"
//     })
//       .success(Review.success)
//       .error(Review.error)

//   })
  
// })
