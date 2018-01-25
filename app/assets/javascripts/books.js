$(function () {
  $('a.show_reviews').on('click', function(e) {
    $(this).hide();
    
    $.ajax({
      method: "GET",
      url: this.href,
    }).done(function(data) {
      $('.reviews').html(data); 

    });
    e.preventDefault();
  }) 
})
