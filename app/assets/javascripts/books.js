function Review(attributes){
  this.id = attributes.id;
  this.rating = attributes.rating;
  this.comment = attributes.comment; 
}

Review.prototype.renderLI() = function(){
  
}

$(function () {
  $('a.show_reviews').on('click', function(e) {
    $(this).hide();
    $.get(this.href).success(function(response){
      $('div.reviews').html(response);
    })
    e.preventDefault();
  })
  
  // form for reviews
  $('#new_review').submit(function(e){
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
    .success(function(json){
      const review = new Review(json);
      const reviewLi = review.renderLI()
    })
    .error(function(response){
      console.log('U blew it', response)
    })
  })


//   $('#new_review').submit(function(e) {
//     url = this.action

//     data = {
//       'authenticity_token': $("input[name='authenticity_token']").val(),
//       'review': {
//         'rating': $("input[name='review[rating]'").val(),
//         'comment': $('#review_comment').val() 
//       }
//     };

//     $.ajax({
//       type: "POST",
//       url: url,
//       data: data,
//       success: function(response) { 
//         $('div.reviews').append(response); 
//         $("#new_review").trigger("reset");
//       }
//     })
//     e.preventDefault();  
//   })

})
