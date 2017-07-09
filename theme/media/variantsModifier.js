/*!
 * VariantsModifier v0.4.3
 * https://github.com/VladimirIvanin/VariantsModifier
 * Vladimir Ivanin
 * 2017
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Modifier(e,r,n){var i=this;i.options=r,i.$form=e,i.productInstance=n.productInstance,i.productJSON=n.productJSON,i.initElements=initElements,i.bindingVariants=bindingVariants,i.renderPrice=renderPrice,i.renderOldPrice=renderOldPrice,i.renderAvailable=renderAvailable,i.renderSku=renderSku,i.renderQuantity=renderQuantity,i.renderImage=renderImage,i.getDataParam=getDataParam,i.isInitImage=!1,r.initVariantImage&&(i.isInitImage=!0),i.getDataParam(),i.initElements(),i.initElements(),i.bindingVariants()}var initElements=require("./initElements"),renderPrice=require("./render").renderPrice,renderOldPrice=require("./render").renderOldPrice,renderAvailable=require("./render").renderAvailable,renderSku=require("./render").renderSku,renderQuantity=require("./render").renderQuantity,renderImage=require("./render").renderImage,bindingVariants=require("./bindingVariants"),getDataParam=require("./getDataParam");Modifier.prototype.updateVariant=function(e){var r=e.action.product?e.action.product[0]:null,n=this;n.renderPrice(e),n.renderOldPrice(e),n.renderAvailable(e),n.renderSku(e),n.renderQuantity(e),n.renderImage(e),n.options.updateVariant(e,r)},module.exports=Modifier;
},{"./bindingVariants":2,"./getDataParam":3,"./initElements":7,"./render":8}],2:[function(require,module,exports){
function bindingVariants(){var i=this,t=i.options,a=t.thumbSize,n=t.thumbWrap,e=i.productJSON,r=i.productInstance;if(e.variants&&e.variants.length&&t.useTriggerThumb){var s={};$.each(e.variants,function(t,e){var c=e.first_image.filename,o=$(n+' [src*="'+a+"_"+c+'"]').eq(0).parents(n+":first");s[c]||(s[c]=!0,o.click(function(t){i.activeImage!=c&&(i.activeImage=c,t.isModifier||Products.getInstance(r).done(function(i){i.variants.setVariant(e.id)}))}))})}}module.exports=bindingVariants;
},{}],3:[function(require,module,exports){
function getDataParam(){var a=this,t=a.options,o=a.$form,r=t.dataParam;$.each(r,function(a,r){var e=o.data(r);e&&(t[a]=e)})}module.exports=getDataParam;
},{}],4:[function(require,module,exports){
function getQuantityMessage(t,a,n){var e=this,s=n||e.options,i=s.templates,u=s.classes,l=i.quantityAlot,o=u.quantityAlot,y=[];return $.each(u,function(t,a){t.indexOf("quantity")>-1&&y.push(a)}),t<=s.quantityEnds&&(l=i.quantityEnds,o=u.quantityEnds),a?null===t&&"object"==typeof t&&(l=i[s.quantityNull],o=u[s.quantityNull]):(l=i.quantityNotAvailable,o=u.quantityNotAvailable),{activeClass:o,message:l,classes:y.join(" ")}}module.exports=getQuantityMessage;
},{}],5:[function(require,module,exports){
var defaults=require("../variables").defaults,init=require("./init"),setVariantByImage=require("./setVariantByImage"),getQuantityMessage=require("./getQuantityMessage"),VariantsModifier=function(e){var t=this;return t.options=$.extend(!0,{},defaults,e),t.init=init,t.setVariantByImage=setVariantByImage,t.getQuantityMessage=getQuantityMessage,EventBus?t.init():console.warn("Не подключен common.js"),t};module.exports=VariantsModifier;
},{"../variables":11,"./getQuantityMessage":4,"./init":6,"./setVariantByImage":9}],6:[function(require,module,exports){
function init(){var i=this;EventBus.subscribe("update_variant:insales:product",function(n){var t=n.action.product?n.action.product[0]:null;t&&!t.instanceVariantsModifier&&(t.instanceVariantsModifier=new Modifier($(t),i.options,n.action)),t&&t.instanceVariantsModifier&&(n.action.quantityState.change||t.instanceVariantsModifier.updateVariant(n))})}var Modifier=require("./Modifier");module.exports=init;
},{"./Modifier":1}],7:[function(require,module,exports){
function initElements(){var i=this,e=i.$form,n=i.options.selectors;i.$price=e.find(n.price),i.$oldPrice=e.find(n.oldPrice),i.$sku=e.find(n.sku),i.$quantity=e.find(n.quantity),i.$available=e.find(n.available)}module.exports=initElements;
},{}],8:[function(require,module,exports){
function renderQuantity(e){var t=this,a=e.quantity,i=t.options,r=getQuantityMessage(a,e.available,i),s=r.message,l=r.activeClass,n=r.classes,o=t.$quantity;if(!i.checkQuantityVariant){var u=i.templates,m=i.classes,d=0;$.each(t.productJSON.variants,function(e,t){t.quantity&&(d+=t.quantity)}),(a=d)<=i.quantityEnds&&(s=u.quantityEnds,l=m.quantityEnds),t.productJSON.available?0===a&&(s=u[i.quantityNull],l=m[i.quantityNull]):(s=u.quantityNotAvailable,l=m.quantityNotAvailable)}var c=getTemplate(s,"");o.removeClass(n),o.html(c).addClass(l)}function renderPrice(e){var t=this,a=t.$price,i=t.options.templates,r=Shop.money.format(e.price),s=getTemplate(i.price,r);a.html(s),t.options.updatePrice(e,t.$form)}function renderOldPrice(e){var t=this,a=t.$form,i=t.$oldPrice,r=(Shop.money.format(e.old_price||e.price),t.options),s=r.classes,l=r.templates,n=Shop.money.format(e.old_price),o=getTemplate(l.oldPrice,n),u=getTemplate(l.emptyOldPrice,n);e.old_price?(i.html(o),a.addClass(s.withOldPrice),a.removeClass(s.withoutOldPrice),r.useToggleOldPrice&&i.show()):(i.html(u),a.addClass(s.withoutOldPrice),a.removeClass(s.withOldPrice),r.useToggleOldPrice&&i.hide()),t.options.updateOldPrice(e,a)}function renderAvailable(e){var t=this,a=t.$form,i=t.$available,r=t.options,s=r.classes,l=r.templates,n=getTemplate(l.available,""),o=getTemplate(l.notAvailable,"");e.available?(i.html(n),a.addClass(s.isAvailable).removeClass(s.notAvailable)):(i.html(o),a.addClass(s.notAvailable).removeClass(s.isAvailable)),t.options.updateAvailable(e,a)}function renderSku(e){var t=this,a=t.$form,i=t.$sku,r=t.options,s=r.classes,l=r.templates,n=getTemplate(l.sku,e.sku),o=getTemplate(l.emptySku,e.sku);e.sku?(i.html(n),a.addClass(s.withSku).removeClass(s.withoutSku),r.useToggleSku&&i.show()):(i.html(o),a.addClass(s.withoutSku).removeClass(s.withSku),r.useToggleSku&&i.hide()),t.options.updateSku(e,a)}function renderImage(e){var t=this,a=t.options,i=e.first_image,r=e.first_image.filename,s=$('[href*="'+r+'"]'),l={$all:$('[src*="'+r+'"]'),$compacts:$('[src*="compact_'+r+'"]'),$larges:$('[src*="large_'+r+'"]'),$mediums:$('[src*="medium_'+r+'"]'),$micros:$('[src*="micro_'+r+'"]'),$thumb:$('[src*="thumb_'+r+'"]'),$originals:$('[src$="'+r+'"]')};if(a.useTriggerThumb&&t.isInitImage){var n=a.thumbSize,o=a.thumbWrap,u=jQuery.Event("click");u.isModifier=!0,$(o+' [src*="'+n+"_"+r+'"]').eq(0).parents(o+":first").trigger(u)}t.isInitImage=!0,t.options.updateImage(e,t.$form,l,i,s)}function getTemplate(e,t){return e&&"string"==typeof e||(e=""),t&&"string"==typeof t||(t=""),e.replace(/%s%/g,t)}var setVariantByImage=require("./setVariantByImage"),getQuantityMessage=require("./getQuantityMessage");module.exports={renderQuantity:renderQuantity,renderPrice:renderPrice,renderOldPrice:renderOldPrice,renderAvailable:renderAvailable,renderSku:renderSku,renderImage:renderImage};
},{"./getQuantityMessage":4,"./setVariantByImage":9}],9:[function(require,module,exports){
function setVariantByImage(e){var a=e.$form,i=getFileName(e.src,e.size),t=a.get(0);if(t){var n=t.instanceVariantsModifier;if(n){var r=n.productJSON,c=!1;$.each(r.variants,function(e,a){var t=a.first_image.filename;i!==t||c||(c=a.id)}),n.inProcess||c&&i!==n.activeImage&&(n.inProcess=!0,Products.getInstance(n.productInstance).done(function(e){n.inProcess=!1,n.activeImage=i,e.variants.setVariant(c)}))}}}function getFileName(e,a){"string"!=typeof e&&(e="",console.warn("Передан пустой url для изображения"));var i=e.split("/"),t=i[i.length-1],n=["compact_","large_","medium_","micro_","thumb_"];return!a||a&&""==a?$.each(n,function(e,a){0!==t.indexOf(a)||(t=t.replace(a,""))}):"original"!=a&&(t=t.replace(a+"_","")),t}module.exports=setVariantByImage;
},{}],10:[function(require,module,exports){
window.VariantsModifier=require("VariantsModifier");
},{"VariantsModifier":5}],11:[function(require,module,exports){
var defaults={selectors:{oldPrice:"[data-product-old-price]",price:"[data-product-price]",sku:"[data-product-sku]",quantity:"[data-quantity-message]",available:"[data-product-available]"},templates:{price:"%s%",oldPrice:"%s%",emptyOldPrice:"",sku:"арт. %s%",emptySku:"",available:"Есть в наличии",notAvailable:"Нет в наличии",quantityEnds:"Заканчивается",quantityAlot:"Много",quantityNotAvailable:"Нет в наличии"},classes:{withOldPrice:"with-old-price",withoutOldPrice:"without-old-price",withSku:"with-sku",withoutSku:"without-sku",isAvailable:"is-available",notAvailable:"not-available",quantityEnds:"is-quantity-ends",quantityAlot:"is-quantity-alot",quantityNotAvailable:"is-quantity-not-available"},quantityEnds:10,thumbSize:"compact",thumbWrap:".js-image-variant",initVariantImage:!1,useTriggerThumb:!0,useToggleOldPrice:!0,useToggleSku:!0,checkQuantityVariant:!0,quantityNull:"quantityAlot",dataParam:{quantityNull:"quantity-null",quantityEnds:"quantity-ends",checkQuantytiVariant:"check-quantity-variant"},updatePrice:function(){},updateOldPrice:function(){},updateAvailable:function(){},updateSku:function(){},updateImage:function(){},updateVariant:function(){}},system={};module.exports={defaults:defaults,system:system};
},{}]},{},[10]);