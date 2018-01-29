function Review(attributes){
  this.id = attributes.id;
  this.rating = attributes.rating;
  this.comment = attributes.comment; 
}

Review.success = function(json) {
  var review = new Review(json);
  var reviewHTML = review.renderHTML(); 
  $('div.reviews').append(reviewHTML)

  $("#new_review").trigger("reset");
  //$('a.show_reviews').trigger("click");
  // $('input[name="review[rating]"]').val("")
  //$("#new_review").trigger("reset");
}
Review.error = function (response) {
  console.log("Yu broke it?", response)
}

$(function () {
  Review.ready()
})
Review.ready = (function () {
  Review.templateSource = $('#review-template').html();
  Review.template = Handlebars.compile(Review.templateSource);
})

Review.prototype.renderHTML = function(){
  return Review.template(this)
}

$(function () {
//   $('a.show_reviews').on('click', function(e) {
//     $(this).hide();
//     $.get(this.href).success(function(response){
//       $('div.reviews').html(response);
//     })
//     e.preventDefault();
//   })
  
  // form for reviews

  // Review.formSubmit = function (e) {
  //   e.preventDefault()
  //   var $form = $(this);
  //   var action = $form.attr("action");
  //   var params = $form.serialize();

  $('form#new_review').submit(function(e){
    e.preventDefault();
    const $form = $(this);
    const action = $form.attr('action');
    const params = $form.serialize(); 

    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
    })
    .success(Review.success)
    .error(Review.error)

  })



})
