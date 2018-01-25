$(function () {
  $('a.show_reviews').on('click', function(e) {
    $(this).hide();
    $.get(this.href).success(function(response){
      $('div.reviews').html(response);
    })
    e.preventDefault();
  })
  
  $('#new_review').submit(function(e) {
    alert('wy u clik dis');
    e.preventDefault();  
  })
})
