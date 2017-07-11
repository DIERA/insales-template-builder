/*!
 * InSalesFeedback v0.14.3
 * https://github.com/VladimirIvanin/InSalesFeedback
 * Vladimir Ivanin
 * 2017
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function binding(){function e(e){0==t.length&&(console.warn("Отсутствует кнопка отправления формы."),t=s.find('[type="submit"]')),e?(t.removeClass(a.classes.disabledButton).prop("disabled",!1).removeAttr("disabled","disabled"),n.removeClass(a.classes.errorAgree)):(t.addClass(a.classes.disabledButton).prop("disabled",!0).attr("disabled","disabled"),n.addClass(a.classes.errorAgree))}var r=this,a=r.options,s=r.$element,t=s.find(getDataAttrName(a.selectors.submit)),n=s.find(getDataAttrName(a.selectors.agree));s.on("submit",function(e){r.eventMachine("before",s,{}),e.preventDefault();var a=r.options.selectors.agree,t=checkAgree(s,a,r.options.useAgree,r.options.errorMessages),n=parseSerialize(s.serialize()),i=r.options.customValidate;if(!t)return r.eventMachine("notagree",s,n),void r.eventMachine("after",s,n);i&&"function"==typeof i?i(s,n)?r.sendMessage(n).done(function(e){r.eventMachine("success",s,e),r.eventMachine("after",s,n)}).fail(function(e){r.eventMachine("fail",s,e),r.eventMachine("after",s,n)}):(r.eventMachine("error",s,n),r.eventMachine("after",s,n)):r.validateFormData(n).done(function(e){r.sendMessage(e).done(function(e){r.eventMachine("success",s,e),r.eventMachine("after",s,n)}).fail(function(e){var a=getFailerrors(e);r.errorRender(a),r.eventMachine("fail",s,e),r.eventMachine("after",s,n)})}).fail(function(e){r.errorRender(e),r.eventMachine("error",s,e),r.eventMachine("after",s,n)})}),n.click(function(t){var n=$(this).prop("checked");if(r.eventMachine("before",s,{}),n){var i=parseSerialize(s.serialize());r.eventMachine("agree",s,i),r.eventMachine("after",s,i),r.successRender(!0),e(!0)}else a.showMessageAgree&&r.errorRender([{name:"agree",errorMessage:r.options.errorMessages.agree}]),e(!1)}),$(document).on(system.events.success,function(e){r.UUID==e.InSalesFeedback.$target[0].InSalesFeedbackUUID&&(r.options.resetFormOnSubmit&&s.trigger("reset"),r.successRender())}),$(document).on(system.events.notagree,function(s){r.UUID==s.InSalesFeedback.$target[0].InSalesFeedbackUUID&&(a.showMessageAgree&&r.errorRender([{name:"agree",errorMessage:r.options.errorMessages.agree}]),e(!1))})}var parseSerialize=require("./helpers").parseSerialize,getFailerrors=require("./helpers").getFailerrors,getDataAttrName=require("./helpers").getDataAttrName,checkAgree=require("./validate").checkAgree,system=require("../variables").system;module.exports=binding;
},{"../variables":10,"./helpers":3,"./validate":8}],2:[function(require,module,exports){
function eventMachine(e,t,n){var i=this,o=getMethodName(e),s=getEventName(e),a=n||{};a.$target=t,"object"==typeof EventBus&&EventBus.publish&&EventBus.publish(s,a);var r=jQuery.Event(s);r.InSalesFeedback=a,$(document).trigger(r),i.options[o]&&"function"==typeof i.options[o]&&i.options[o](a)}function getEventName(e){return system.events[e]}function getMethodName(e){return"on"+capitalize(e)}var system=require("../variables").system,capitalize=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};module.exports=eventMachine;
},{"../variables":10}],3:[function(require,module,exports){
function parseSerialize(e){if(""==e)return{};var t={},r=decodeURI(e).replace("?","").split("&"),n=new RegExp(/(([A-Za-z0-9])+)+/g);return $.each(r,function(e,r){if(""!==r)if(r=r.split("="),r[1]=r[1].replace(/%(?!\d+)/g,"%25"),r[0].indexOf("[]")>-1){a=(i=r[0].match(n))[0];t[a]||(t[a]=[]),t[a].push(r[1])}else if(r[0].indexOf("[")>-1){var a=r[0],i=r[0].match(n);t[i[0]]||(t[i[0]]=[]),t[i[0]][i[1]]||(t[i[0]][i[1]]=[]),"undefined"===(x=decodeURIComponent(r[1]))&&(x=""),t[i[0]][i[1]].push(x)}else{var x=decodeURIComponent(r[1]);"undefined"===x&&(x=""),t[r[0]]=x}}),t}function getPageLink(){return'<a href="'+window.location.href+'">'+$("title").text()+"</a>"}function testRequire(e,t){return t.indexOf(e)>-1}function getPhoneNumberLength(e){e=e?decodeURIComponent(e.replace(/%(?!\d+)/g,"%25")):"";var t=new RegExp(/[\d]/g),r=e.match(t);return r||(r=[]),r.length}function emailTest(e){var t=e||"";return new RegExp(/.+@.+\..+/g).test(t)}function generateUUID(){var e=(new Date).getTime();return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?r:3&r|8).toString(16)})}function getFailerrors(e){var t=[];return e.errors&&$.each(e.errors,function(e,r){t.push({name:e,errorMessage:r[0]||""})}),t}function getDataAttrName(e,t){return"["+(t?e+'="'+t+'"':e)+"]"}module.exports={parseSerialize:parseSerialize,testRequire:testRequire,generateUUID:generateUUID,emailTest:emailTest,getFailerrors:getFailerrors,getPhoneNumberLength:getPhoneNumberLength,getDataAttrName:getDataAttrName,getPageLink:getPageLink};
},{}],4:[function(require,module,exports){
var defaults=require("../variables").defaults,binding=require("./binding"),eventMachine=require("./eventMachine"),sendMessage=require("./sendMessage"),errorRender=require("./render").errorRender,successRender=require("./render").successRender,checkProduct=require("./validate").checkProduct,checkNameContent=require("./validate").checkNameContent,validateFormData=require("./validate").validateFormData,generateUUID=require("./helpers").generateUUID,Feedback=function(e,r){var n=this;n.$element=$(e);var a=generateUUID();return n.UUID=a,n.$element[0].InSalesFeedbackUUID=a,n.options=$.extend(!0,{},defaults,r),n.initBinding=binding,n.sendMessage=sendMessage,n.eventMachine=eventMachine,n.validateFormData=validateFormData,n.errorRender=errorRender,n.successRender=successRender,n.initFeedback(),n};Feedback.prototype.initFeedback=function(e,r){var n=this;n.isPageProduct=checkProduct(),n.initBinding(),n.options.useDefaultContent||checkNameContent(n.$element)},module.exports=Feedback;
},{"../variables":10,"./binding":1,"./eventMachine":2,"./helpers":3,"./render":5,"./sendMessage":6,"./validate":8}],5:[function(require,module,exports){
function errorRender(e){function s(e,s,n){e.removeClass(l),s.removeClass(d),renderWithOptions(n,"","",!1,t),renderWithOptions(r.$element.find(i),"","",!1,t),renderWithOptions(r.$element.find(a),"","",!1,t)}var r=this,t=r.options.useJqueryToggle,n=getDataAttrName(r.options.selectors.field)+":first",o=getDataAttrName(r.options.selectors.inputError),i=getDataAttrName(r.options.selectors.error),a=getDataAttrName(r.options.selectors.errors),l=r.options.classes.errorInput,d=r.options.classes.errorField;$.each(e,function(e,i){var a=r.$element.find('[name="'+i.name+'"]'),m=a.parents(n),c=m.find(o);a.addClass(l),m.addClass(d),renderWithOptions(c,i.errorMessage,"",!0,t),r.options.hideErrorOnFocus&&a.on("click",function(e){s(a,m,c)})});var m=[];if($.each(e,function(e,s){m.push(s.name)}),$.each(system.names,function(e,t){if(-1==m.indexOf(t)){var i=r.$element.find('[name="'+t+'"]'),a=i.parents(n);s(i,a,a.find(o))}}),e&&e.length){r.$element.addClass(r.options.classes.errorForm),renderWithOptions(r.$element.find(i),r.options.messages.error,"",!0,t);var c="";_.forEach(e,function(e){c+=e.errorMessage+"<br />"}),renderWithOptions(r.$element.find(a),c,"",!0,t)}}function successRender(e){var s=this,r=s.$element,t=s.options.useJqueryToggle,n=s.options.hideSuccessMessageTimer,o=s.options.classes.errorInput,i=s.options.classes.errorField,a=getDataAttrName(s.options.selectors.field),l=getDataAttrName(s.options.selectors.inputError),d=getDataAttrName(s.options.selectors.error),m=getDataAttrName(s.options.selectors.errors),c=getDataAttrName(s.options.selectors.success);s.$element.find("[name]").removeClass(o),s.$element.find(a).removeClass(i),s.$element.removeClass(s.options.classes.errorForm),renderWithOptions(r.find(d),"","",!1,t),renderWithOptions(r.find(m),"","",!1,t),renderWithOptions(r.find(l),"","",!1,t),e||renderWithOptions(r.find(c),s.options.messages.success,"",!0,t,n)}function renderWithOptions(e,s,r,t,n,o){s&&e.html(s),t?e.addClass(r):e.removeClass(r),n&&(t?e.show():e.hide()),o&&setTimeout(function(){e.removeClass(r),e.html(""),n&&e.hide()},o)}var getDataAttrName=require("./helpers").getDataAttrName,system=require("../variables").system;module.exports={errorRender:errorRender,successRender:successRender};
},{"../variables":10,"./helpers":3}],6:[function(require,module,exports){
function sendMessage(e){var r=$.Deferred(),s={lang:parseSerialize(window.location.search).lang||"",feedback:e};return $.post("/client_account/feedback.json",s).done(function(e){s&&"ok"==e.status?r.resolve(e):(e.message=s,r.reject(e))}),r.promise()}var parseSerialize=require("./helpers").parseSerialize;module.exports=sendMessage;
},{"./helpers":3}],7:[function(require,module,exports){
function updateContentData(t,e,n){var o=$.Deferred(),r=e||"";return r=getCustomContent(t,r),r=getContentHtml(t,r),t.isPageProduct&&t.options.includeProductInfo&&!n?$.ajax({url:window.location.pathname+".json",type:"GET",dataType:"json"}).done(function(e){e&&e.product?(t.options.messageContent&&(r=updateContentTop(r,t.options.messageContent)),r=getProductInfo(e.product,r),t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r)):(t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r))}).fail(function(){t.options.urlPageOnContent&&(r=updateContentFooter(r)),o.resolve(r)}):t.options.urlPageOnContent&&(r=updateContentFooter(r)),t.isPageProduct&&t.options.includeProductInfo&&!n||o.resolve(r),o.promise()}function getProductInfo(t,e){var n='<div><a href="'+t.url+'">';return t.first_image&&(n+='<img src="'+t.first_image.medium_url+'" />'),n+="</a></div>",n+=getRow("Товар",t.title),t.sku&&(n+=getRow("Артикул",t.sku)),e+n}function getRow(t,e){return"<div><strong>"+t+":</strong> "+e+"</div>"}function getContentHtml(t,e){var n=e;return t.$element.find("["+t.options.selectors.html+"]").each(function(t,e){n+=$(e).html()}),n}function getCustomContent(t,e){var n=e;return t.$element.find("["+t.options.selectors.customContent+"]").each(function(e,o){var r=$(o).data(t.options.selectors.customContent.replace("data-","")),u=$(o).val();u||(u=$(o).html()),""===u&&(u="не заполнено"),n+=getRow(r,u)}),n}function updateContentTop(t,e){return t+("<br />"+e+"<br />")}function updateContentFooter(t){return t+("<br /> Отправлено со страницы: "+getPageLink())}var getPageLink=require("./helpers").getPageLink;module.exports=updateContentData;
},{"./helpers":3}],8:[function(require,module,exports){
function checkDuplicateId(e){var r=!1,t=e.get(0);return t.id&&$('[id="'+t.id+'"]').length>1&&(r=!0,console.warn("Внимание! Задвоенный идентификатор - #"+t.id+". Форма может некорректно отправляться.")),r}function checkProduct(){return window.location.pathname.indexOf("/product/")>-1}function validateFormData(e){var r=this,t=$.Deferred(),a=[],o=r.options.require,n=e,s=testRequire("from",o),i=validateFrom(n.from,s,r.options.errorMessages.from);n.from=i.value,i.isError&&a.push({name:"from",errorMessage:i.errorMessage});var u=testRequire("phone",o),c=validatePhone(n.phone,u,r.options.phoneNumberLength,r.options.errorMessages.phone);n.phone=c.value,c.isError&&a.push({name:"phone",errorMessage:c.errorMessage});var l=testRequire("name",o),v=validateName(n.name,l,r.options.errorMessages.name);n.name=v.value,v.isError&&a.push({name:"name",errorMessage:v.errorMessage});var h=testRequire("subject",o),d=validateSubject(n.subject,h,r.options.errorMessages.subject);if(n.subject=d.value,d.isError&&a.push({name:"subject",errorMessage:d.errorMessage}),r.options.useDefaultContent||n.content)updateContentData(r,n.content,a.length>0).done(function(e){n.content=e;var o=validateContent(n.content,!r.options.useDefaultContent);n.content=o.value,o.isError&&a.push({name:"content",errorMessage:o.errorMessage}),a.length>0?t.reject(a):t.resolve(n)});else{var m=validateContent(n.content,!r.options.useDefaultContent,r.options.errorMessages.content);n.content=m.value,m.isError&&a.push({name:"content",errorMessage:m.errorMessage}),a.length>0?t.reject(a):t.resolve(n)}return t.promise()}function validatePhone(e,r,t,a){var o={isError:!1,errorMessage:a,value:decodeURIComponent(e.replace(/%(?!\d+)/g,"%25"))};return e=decodeURIComponent(e.replace(/%(?!\d+)/g,"%25")),!r&&e&&""==e||!r&&!e?o.value=system.dataDefault.phone:r&&(e&&""!=e?t>getPhoneNumberLength(e)&&(o.isError=!0):o.isError=!0),o}function validateFrom(e,r,t){var a={isError:!1,errorMessage:t,value:e};if(!r&&e&&""==e||!r&&!e){var o=window.location.host;-1==o.indexOf(".")&&(o="myinsales.ru"),a.value="shop@"+o}else e&&""!=e&&emailTest(e)||(a.isError=!0);return a}function validateName(e,r,t){var a={isError:!1,errorMessage:t,value:e};return!r&&e&&""==e||!r&&!e?a.value=system.dataDefault.name:e&&""!=e||(a.isError=!0),a}function validateSubject(e,r,t){var a={isError:!1,errorMessage:t,value:e};return!r&&e&&""==e||!r&&!e?a.value=system.dataDefault.subject:e&&""!=e||(a.isError=!0),a}function validateContent(e,r,t){var a={isError:!1,errorMessage:t,value:e};if(e){var o=e.trim();!r&&e&&""==o||!r&&!e?a.value=system.dataDefault.content:e&&""!=o||(a.isError=!0)}else a.isError=!0,a.value="";return a}function checkNameContent(e){0==e.find('[name="content"]').length&&console.warn("В форме отсутствует поле content",e)}function checkAgree(e,r,t,a){var o=!0;if(t){var n=e.find("["+r+"]");0!=n.length&&n.prop("checked")||(o=!1),0==n.length&&console.warn("Отсутствует чекбокс согласия на обработку персональных данных")}return o}var system=require("../variables").system,updateContentData=require("./updateContentData"),testRequire=require("./helpers").testRequire,emailTest=require("./helpers").emailTest,getPhoneNumberLength=require("./helpers").getPhoneNumberLength;module.exports={checkDuplicateId:checkDuplicateId,checkProduct:checkProduct,checkAgree:checkAgree,checkNameContent:checkNameContent,validateFormData:validateFormData};
},{"../variables":10,"./helpers":3,"./updateContentData":7}],9:[function(require,module,exports){
var Feedback=require("feedback"),system=require("variables").system,checkDuplicateId=require("./feedback/validate").checkDuplicateId;!function(e,a,t){var c=e.fn.InSalesFeedback;e.fn.InSalesFeedback=function(a){return this.each(function(t){var c=e(this),n="object"==typeof a&&a,s=c.data(system.NAME);checkDuplicateId(c);(s||"destroy"!==a)&&(s||c.data(system.NAME,s=new Feedback(c,n)),"string"==typeof a&&s[a]())})},e.fn.InSalesFeedback.defaults=require("variables").defaults,e.fn.InSalesFeedback.noConflict=function(){return e.fn.InSalesFeedback=c,this}}(jQuery,window);
},{"./feedback/validate":8,"feedback":4,"variables":10}],10:[function(require,module,exports){
var defaults={useAgree:!1,showMessageAgree:!1,includeProductInfo:!0,messageContent:null,urlPageOnContent:!0,useJqueryToggle:!0,hideSuccessMessageTimer:5e3,hideErrorOnFocus:!0,resetFormOnSubmit:!0,useDefaultContent:!0,phoneNumberLength:11,require:[],onSuccess:function(){},onFail:function(){},onError:function(){},onBefore:function(){},onAfter:function(){},onAgree:function(){},onNotagree:function(){},customValidate:null,classes:{errorInput:"is-error-feedback-input",errorField:"is-error-feedback-field",errorForm:"is-error-feedback",errorAgree:"is-error-agree-feedback",disabledButton:"is-disabled-feedback",failForm:"is-fail-feedback"},errorMessages:{from:"Поле e-mail имеет неверное значение",phone:"Укажите номер в международном формате",name:"Не заполнено поле имя",subject:"Не заполнено поле тема сообщения",agree:"Необходимо принять условия передачи информации",content:"Не заполнено поле текст сообщения"},messages:{success:"Сообщение успешно отправлено!",fail:"Сообщение не отправлено, попробуйте ещё раз!",error:"Неверно заполнены поля!"},selectors:{html:"data-feedback-html",customContent:"data-feedback-custom-content",submit:"data-feedback-submit",agree:"data-feedback-agree",field:"data-feedback-field",input:"data-feedback-input",inputError:"data-feedback-input-error",success:"data-feedback-success",error:"data-feedback-error",errors:"data-feedback-errors"}},system={NAME:"InSalesFeedback",VERSION:"0.14.2",NAMESPACE:".InSalesFeedback",names:{from:"from",name:"name",phone:"phone",subject:"subject",content:"content"},dataDefault:{from:"shop@myinsales.ru",name:"не заполнено",phone:"не заполнено",subject:"Заказ обратного звонка.",content:"Заказ обратного звонка."},events:{before:"before::feedback",after:"after::feedback",success:"success::feedback",fail:"fail::feedback",agree:"agree::feedback",notagree:"notagree::feedback",error:"error::feedback"}};module.exports={defaults:defaults,system:system};
},{}]},{},[9]);
