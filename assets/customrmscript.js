jQuery(function($) {
  console.log('hey')
  
  $('..collection-description').on('click', '.collection-description__btn', function() {
    var $parent = $(this).parent();

    $parent.toggleClass('in');

    if ( $parent.hasClass('in') ) {
     $(this).html('Read Less');
    } else {
      $(this).html('Read More');
    }
  });
  
});