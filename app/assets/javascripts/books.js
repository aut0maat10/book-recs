$(function () {
  $('a.show_reviews').on('click', function(e) {
    $(this).hide();
    $.get(this.href).success(function(response){
      $('div.reviews').html(response);
    })
    e.preventDefault();
  })
  
  $('#new_review').submit(function(e) {
    url = this.action

    data = {
      'authenticity_token': $("input[name='authenticity_token']").val(),
      'review': {
        'rating': $("input[name='review[rating]'").val(),
        'comment': $('#review_comment').val() 
      }
    };

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function(response) { 
        $('div.reviews').append(response); 
        $("#new_review").trigger("reset");
        
      }
    })
    e.preventDefault();  
  })
})
