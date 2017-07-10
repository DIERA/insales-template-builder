$(function () {
  /**
   * Object-fit hack
   */
  var isSupports = typeof CSS != 'undefined' && CSS.supports && CSS.supports("object-fit", "cover");

  if (!isSupports) {
    $('.image-container.is-cover').each(function () {
      var $container = $(this),
        imgUrl = $container.find('img').prop('src');
      if (imgUrl) {
        $container
          .css('backgroundImage', 'url(' + imgUrl + ')')
          .addClass('with-trick');
      }
    });
  }

  $('body').addClass('dom-ready');

  $(window).on('load', function(event) {
    $('body').addClass('window-load');
  });
});
