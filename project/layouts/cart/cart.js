$(document).ready(function() {
  EventBus.subscribe('delete_items:insales:cart', function (data) {
    if (Site.template && Site.template != 'cart') {
      return false;
    }

    var $button = data.action.button;
    var $cartItem = $button.parents('.cart-item:first');
    var $emptyMessage = $('.js-cart-empty');
    var $cartForm = $('[data-cart-form]');

    $cartItem
    .slideUp(300, function () {
      $(this).remove();
    });
  });

  EventBus.subscribe('update_items:insales:cart', function (cart) {

    updateItemTotal(cart.order_lines);

    updateTotalPrice(cart.total_price, cart.items_price);

    $('.js-count-words').html( 'В вашей корзине ' + cart.items_count + '&nbsp;' + declinationText(cart.items_count) );

    $('[data-cart-counter]').html( cart.items_count );

    if (cart.order_lines.length == 0) {
      $('[data-cart-quick]').hide();
      $('.cart_sidebar').hide();
      $('.cart-item').hide();
      $('.cart-empty').removeClass('hide');
    }

    getDiscounts()
  });

  function updateTotalPrice(_totalPrice, _items_price) {
    $('.js-cart-totals').html( Shop.money.format( _totalPrice ) );
    $('.js-cart-items_price').html( Shop.money.format( _items_price ) );
  }

  function updateItemTotal(order_lines) {
    _.forEach(order_lines, function (item) {
      var $item = $('[data-item-id="'+item.variant_id+'"]');
      $item.find('.js-item-total_price').each(function(index, el) {
        $(el).html( Shop.money.format( item.total_price ) );
      });;
    });
  }

  function getDiscounts() {
    $.ajax({
      url: '/cart_items',
      dataType: 'html',
    })
    .done(function(_dom) {
      var _discounts = $(_dom).find('.js-discounts').html();
      $('.js-discounts').html(_discounts);
    })

  }
});

var declinationText = function (day, titles) {
  var _titles = ['товар', 'товара', 'товаров'];
  if (titles) {
    _titles = titles;
  }
  var cases = [2, 0, 1, 1, 1, 2];
  return _titles[ (day % 100 > 4 && day % 100 < 20) ? 2 : cases[(day % 10 < 5) ? day % 10 : 5]];
};
