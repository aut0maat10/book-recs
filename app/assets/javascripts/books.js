$(function () {
  $('a.show_reviews').on('click', function(e) {
    $(this).hide();
    $.get(this.href).success(function(response){
      $('div.reviews').html(response);
    })
    e.preventDefault();
  }) 
})
