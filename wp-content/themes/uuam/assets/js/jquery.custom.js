/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.9.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
(function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)})(function(i){"use strict";var e=window.Slick||{};e=function(){function e(e,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(e),appendDots:i(e),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(e),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(e).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,"undefined"!=typeof document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=t++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}var t=0;return e}(),e.prototype.activateADA=function(){var i=this;i.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):o===!0?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),s.options.rtl===!0&&s.options.vertical===!1&&(e=-e),s.transformsEnabled===!1?s.options.vertical===!1?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):s.cssTransitions===!1?(s.options.rtl===!0&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),s.options.vertical===!1?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),s.options.vertical===!1?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this,o=t.getNavTarget();null!==o&&"object"==typeof o&&o.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};e.options.fade===!1?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(i.options.infinite===!1&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1===0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;e.options.arrows===!0&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),e.options.infinite!==!0&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(o.options.dots===!0&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),e.options.centerMode!==!0&&e.options.swipeToSlide!==!0||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.options.draggable===!0&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(r.originalSettings.mobileFirst===!1?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,e===!0&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||l===!1||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!==0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t,o=this;if(e=o.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var s in e){if(i<e[s]){i=t;break}t=e[s]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),e.options.accessibility===!0&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),e.options.accessibility===!0&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),e.options.accessibility===!0&&e.$list.off("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&(i=e.$slides.children().children(),i.removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){var e=this;e.shouldClick===!1&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",e.options.fade===!1?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;t.cssTransitions===!1?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;e.cssTransitions===!1?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(t){var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&o.is(":focus")&&(e.focussed=!0,e.autoPlay())},0)}).on("blur.slick","*",function(t){i(this);e.options.pauseOnFocus&&(e.focussed=!1,e.autoPlay())})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){var i=this;return i.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(i.options.infinite===!0)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(i.options.centerMode===!0)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),n.options.infinite===!0?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,n.options.vertical===!0&&n.options.centerMode===!0&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!==0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),n.options.centerMode===!0&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:n.options.centerMode===!0&&n.options.infinite===!0?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:n.options.centerMode===!0&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=n.options.vertical===!1?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,n.options.variableWidth===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,n.options.centerMode===!0&&(o=n.slideCount<=n.options.slidesToShow||n.options.infinite===!1?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=n.options.rtl===!0?o[0]?(n.$slideTrack.width()-o[0].offsetLeft-o.width())*-1:0:o[0]?o[0].offsetLeft*-1:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){var e=this;return e.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(e.options.infinite===!1?i=e.slideCount:(t=e.options.slidesToScroll*-1,o=e.options.slidesToScroll*-1,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o,s,n=this;return s=n.options.centerMode===!0?Math.floor(n.$list.width()/2):0,o=n.swipeLeft*-1+s,n.options.swipeToSlide===!0?(n.$slideTrack.find(".slick-slide").each(function(e,s){var r,l,d;if(r=i(s).outerWidth(),l=s.offsetLeft,n.options.centerMode!==!0&&(l+=r/2),d=l+r,o<d)return t=s,!1}),e=Math.abs(i(t).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){var t=this;t.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),t.options.accessibility===!0&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),s!==-1){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),i.options.accessibility===!0&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;e.options.dots===!0&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),e.options.accessibility===!0&&e.$dots.on("keydown.slick",e.keyHandler)),e.options.dots===!0&&e.options.pauseOnDotsHover===!0&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),e.options.accessibility===!0&&e.$list.on("keydown.slick",e.keyHandler),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&e.options.accessibility===!0?e.changeSlide({data:{message:e.options.rtl===!0?"next":"previous"}}):39===i.keyCode&&e.options.accessibility===!0&&e.changeSlide({data:{message:e.options.rtl===!0?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||r.$slider.attr("data-sizes"),n=document.createElement("img");n.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),r.$slider.trigger("lazyLoaded",[r,e,t])})},n.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),r.$slider.trigger("lazyLoadError",[r,e,t])},n.src=t})}var t,o,s,n,r=this;if(r.options.centerMode===!0?r.options.infinite===!0?(s=r.currentSlide+(r.options.slidesToShow/2+1),n=s+r.options.slidesToShow+2):(s=Math.max(0,r.currentSlide-(r.options.slidesToShow/2+1)),n=2+(r.options.slidesToShow/2+1)+r.currentSlide):(s=r.options.infinite?r.options.slidesToShow+r.currentSlide:r.currentSlide,n=Math.ceil(s+r.options.slidesToShow),r.options.fade===!0&&(s>0&&s--,n<=r.slideCount&&n++)),t=r.$slider.find(".slick-slide").slice(s,n),"anticipated"===r.options.lazyLoad)for(var l=s-1,d=n,a=r.$slider.find(".slick-slide"),c=0;c<r.options.slidesToScroll;c++)l<0&&(l=r.slideCount-1),t=t.add(a.eq(l)),t=t.add(a.eq(d)),l--,d++;e(t),r.slideCount<=r.options.slidesToShow?(o=r.$slider.find(".slick-slide"),e(o)):r.currentSlide>=r.slideCount-r.options.slidesToShow?(o=r.$slider.find(".slick-cloned").slice(0,r.options.slidesToShow),e(o)):0===r.currentSlide&&(o=r.$slider.find(".slick-cloned").slice(r.options.slidesToShow*-1),e(o))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){var i=this;i.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;if(!t.unslicked&&(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),t.options.accessibility===!0&&(t.initADA(),t.options.focusOnChange))){var o=i(t.$slides.get(t.currentSlide));o.attr("tabindex",0).focus()}},e.prototype.prev=e.prototype.slickPrev=function(){var i=this;i.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),r=document.createElement("img"),r.onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),l.options.adaptiveHeight===!0&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),e.options.focusOnSelect===!0&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;return"boolean"==typeof i?(e=i,i=e===!0?0:o.slideCount-1):i=e===!0?--i:i,!(o.slideCount<1||i<0||i>o.slideCount-1)&&(o.unload(),t===!0?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,void o.reinit())},e.prototype.setCSS=function(i){var e,t,o=this,s={};o.options.rtl===!0&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,o.transformsEnabled===!1?o.$slideTrack.css(s):(s={},o.cssTransitions===!1?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;i.options.vertical===!1?i.options.centerMode===!0&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),i.options.centerMode===!0&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),i.options.vertical===!1&&i.options.variableWidth===!1?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):i.options.variableWidth===!0?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();i.options.variableWidth===!1&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,t.options.rtl===!0?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&i.options.adaptiveHeight===!0&&i.options.vertical===!1){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":"undefined"!=typeof arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),i.options.fade===!1?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=i.options.vertical===!0?"top":"left",
"top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||i.options.useCSS===!0&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&i.animType!==!1&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&i.animType!==!1},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),n.options.centerMode===!0){var r=n.options.slidesToShow%2===0?1:0;e=Math.floor(n.options.slidesToShow/2),n.options.infinite===!0&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=n.options.infinite===!0?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(s.options.fade===!0&&(s.options.centerMode=!1),s.options.infinite===!0&&s.options.fade===!1&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=s.options.centerMode===!0?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));return s||(s=0),t.slideCount<=t.options.slidesToShow?void t.slideHandler(s,!1,!0):void t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(a.animating===!0&&a.options.waitForAnimate===!0||a.options.fade===!0&&a.currentSlide===i))return e===!1&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,a.options.infinite===!1&&a.options.centerMode===!1&&(i<0||i>a.getDotCount()*a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):a.options.infinite===!1&&a.options.centerMode===!0&&(i<0||i>a.slideCount-a.options.slidesToScroll)?void(a.options.fade===!1&&(o=a.currentSlide,t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o))):(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!==0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!==0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=a.getNavTarget(),l=l.slick("getSlick"),l.slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide)),a.updateDots(),a.updateArrows(),a.options.fade===!0?(t!==!0?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight()):void(t!==!0&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)))},e.prototype.startLoad=function(){var i=this;i.options.arrows===!0&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),i.options.dots===!0&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),o=Math.round(180*t/Math.PI),o<0&&(o=360-Math.abs(o)),o<=45&&o>=0?s.options.rtl===!1?"left":"right":o<=360&&o>=315?s.options.rtl===!1?"left":"right":o>=135&&o<=225?s.options.rtl===!1?"right":"left":s.options.verticalSwiping===!0?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(o.touchObject.edgeHit===!0&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(e.options.swipe===!1||"ontouchend"in document&&e.options.swipe===!1||e.options.draggable===!1&&i.type.indexOf("mouse")!==-1))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,e.options.verticalSwiping===!0&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(l.options.verticalSwiping===!0&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(l.options.rtl===!1?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),l.options.verticalSwiping===!0&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,l.options.infinite===!1&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),l.options.vertical===!1?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,l.options.verticalSwiping===!0&&(l.swipeLeft=e+o*s),l.options.fade!==!0&&l.options.touchMove!==!1&&(l.animating===!0?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;return t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow?(t.touchObject={},!1):(void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,void(t.dragging=!0))},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i,e=this;i=Math.floor(e.options.slidesToShow/2),e.options.arrows===!0&&e.slideCount>e.options.slidesToShow&&!e.options.infinite&&(e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===e.currentSlide?(e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-e.options.slidesToShow&&e.options.centerMode===!1?(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):e.currentSlide>=e.slideCount-1&&e.options.centerMode===!0&&(e.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||"undefined"==typeof s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),"undefined"!=typeof t)return t;return o}});


/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);

/*! jQuery & Zepto Lazy v1.7.10 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function(t,e){"use strict";function r(r,a,i,u,l){function f(){L=t.devicePixelRatio>1,i=c(i),a.delay>=0&&setTimeout(function(){s(!0)},a.delay),(a.delay<0||a.combined)&&(u.e=v(a.throttle,function(t){"resize"===t.type&&(w=B=-1),s(t.all)}),u.a=function(t){t=c(t),i.push.apply(i,t)},u.g=function(){return i=n(i).filter(function(){return!n(this).data(a.loadedName)})},u.f=function(t){for(var e=0;e<t.length;e++){var r=i.filter(function(){return this===t[e]});r.length&&s(!1,r)}},s(),n(a.appendScroll).on("scroll."+l+" resize."+l,u.e))}function c(t){var i=a.defaultImage,o=a.placeholder,u=a.imageBase,l=a.srcsetAttribute,f=a.loaderAttribute,c=a._f||{};t=n(t).filter(function(){var t=n(this),r=m(this);return!t.data(a.handledName)&&(t.attr(a.attribute)||t.attr(l)||t.attr(f)||c[r]!==e)}).data("plugin_"+a.name,r);for(var s=0,d=t.length;s<d;s++){var A=n(t[s]),g=m(t[s]),h=A.attr(a.imageBaseAttribute)||u;g===N&&h&&A.attr(l)&&A.attr(l,b(A.attr(l),h)),c[g]===e||A.attr(f)||A.attr(f,c[g]),g===N&&i&&!A.attr(E)?A.attr(E,i):g===N||!o||A.css(O)&&"none"!==A.css(O)||A.css(O,"url('"+o+"')")}return t}function s(t,e){if(!i.length)return void(a.autoDestroy&&r.destroy());for(var o=e||i,u=!1,l=a.imageBase||"",f=a.srcsetAttribute,c=a.handledName,s=0;s<o.length;s++)if(t||e||A(o[s])){var g=n(o[s]),h=m(o[s]),b=g.attr(a.attribute),v=g.attr(a.imageBaseAttribute)||l,p=g.attr(a.loaderAttribute);g.data(c)||a.visibleOnly&&!g.is(":visible")||!((b||g.attr(f))&&(h===N&&(v+b!==g.attr(E)||g.attr(f)!==g.attr(F))||h!==N&&v+b!==g.css(O))||p)||(u=!0,g.data(c,!0),d(g,h,v,p))}u&&(i=n(i).filter(function(){return!n(this).data(c)}))}function d(t,e,r,i){++z;var o=function(){y("onError",t),p(),o=n.noop};y("beforeLoad",t);var u=a.attribute,l=a.srcsetAttribute,f=a.sizesAttribute,c=a.retinaAttribute,s=a.removeAttribute,d=a.loadedName,A=t.attr(c);if(i){var g=function(){s&&t.removeAttr(a.loaderAttribute),t.data(d,!0),y(T,t),setTimeout(p,1),g=n.noop};t.off(I).one(I,o).one(D,g),y(i,t,function(e){e?(t.off(D),g()):(t.off(I),o())})||t.trigger(I)}else{var h=n(new Image);h.one(I,o).one(D,function(){t.hide(),e===N?t.attr(C,h.attr(C)).attr(F,h.attr(F)).attr(E,h.attr(E)):t.css(O,"url('"+h.attr(E)+"')"),t[a.effect](a.effectTime),s&&(t.removeAttr(u+" "+l+" "+c+" "+a.imageBaseAttribute),f!==C&&t.removeAttr(f)),t.data(d,!0),y(T,t),h.remove(),p()});var m=(L&&A?A:t.attr(u))||"";h.attr(C,t.attr(f)).attr(F,t.attr(l)).attr(E,m?r+m:null),h.complete&&h.trigger(D)}}function A(t){var e=t.getBoundingClientRect(),r=a.scrollDirection,n=a.threshold,i=h()+n>e.top&&-n<e.bottom,o=g()+n>e.left&&-n<e.right;return"vertical"===r?i:"horizontal"===r?o:i&&o}function g(){return w>=0?w:w=n(t).width()}function h(){return B>=0?B:B=n(t).height()}function m(t){return t.tagName.toLowerCase()}function b(t,e){if(e){var r=t.split(",");t="";for(var a=0,n=r.length;a<n;a++)t+=e+r[a].trim()+(a!==n-1?",":"")}return t}function v(t,e){var n,i=0;return function(o,u){function l(){i=+new Date,e.call(r,o)}var f=+new Date-i;n&&clearTimeout(n),f>t||!a.enableThrottle||u?l():n=setTimeout(l,t-f)}}function p(){--z,i.length||z||y("onFinishedAll")}function y(t,e,n){return!!(t=a[t])&&(t.apply(r,[].slice.call(arguments,1)),!0)}var z=0,w=-1,B=-1,L=!1,T="afterLoad",D="load",I="error",N="img",E="src",F="srcset",C="sizes",O="background-image";"event"===a.bind||o?f():n(t).on(D+"."+l,f)}function a(a,o){var u=this,l=n.extend({},u.config,o),f={},c=l.name+"-"+ ++i;return u.config=function(t,r){return r===e?l[t]:(l[t]=r,u)},u.addItems=function(t){return f.a&&f.a("string"===n.type(t)?n(t):t),u},u.getItems=function(){return f.g?f.g():{}},u.update=function(t){return f.e&&f.e({},!t),u},u.force=function(t){return f.f&&f.f("string"===n.type(t)?n(t):t),u},u.loadAll=function(){return f.e&&f.e({all:!0},!0),u},u.destroy=function(){return n(l.appendScroll).off("."+c,f.e),n(t).off("."+c),f={},e},r(u,l,a,f,c),l.chainable?a:u}var n=t.jQuery||t.Zepto,i=0,o=!1;n.fn.Lazy=n.fn.lazy=function(t){return new a(this,t)},n.Lazy=n.lazy=function(t,r,i){if(n.isFunction(r)&&(i=r,r=[]),n.isFunction(i)){t=n.isArray(t)?t:[t],r=n.isArray(r)?r:[r];for(var o=a.prototype.config,u=o._f||(o._f={}),l=0,f=t.length;l<f;l++)(o[t[l]]===e||n.isFunction(o[t[l]]))&&(o[t[l]]=i);for(var c=0,s=r.length;c<s;c++)u[r[c]]=t[0]}},a.prototype.config={name:"lazy",chainable:!0,autoDestroy:!0,bind:"load",threshold:500,visibleOnly:!1,appendScroll:t,scrollDirection:"both",imageBase:null,defaultImage:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",placeholder:null,delay:-1,combined:!1,attribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes",retinaAttribute:"data-retina",loaderAttribute:"data-loader",imageBaseAttribute:"data-imagebase",removeAttribute:!0,handledName:"handled",loadedName:"loaded",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,beforeLoad:e,afterLoad:e,onError:e,onFinishedAll:e},n(t).on("load",function(){o=!0})}(window);

/*! jQuery & Zepto Lazy - All Plugins v1.7.10 - http://jquery.eisbehr.de/lazy - MIT&GPL-2.0 license - Copyright 2012-2018 Daniel 'Eisbehr' Kern */
!function(t){function a(a,e,r,o){o=o?o.toUpperCase():"GET";var i;"POST"!==o&&"PUT"!==o||!a.config("ajaxCreateData")||(i=a.config("ajaxCreateData").apply(a,[e])),t.ajax({url:e.attr("data-src"),type:"POST"===o||"PUT"===o?o:"GET",data:i,dataType:e.attr("data-type")||"html",success:function(t){e.html(t),r(!0),a.config("removeAttribute")&&e.removeAttr("data-src data-method data-type")},error:function(){r(!1)}})}t.lazy("ajax",function(t,e){a(this,t,e,t.attr("data-method"))}),t.lazy("get",function(t,e){a(this,t,e,"GET")}),t.lazy("post",function(t,e){a(this,t,e,"POST")}),t.lazy("put",function(t,e){a(this,t,e,"PUT")})}(window.jQuery||window.Zepto),function(t){t.lazy(["av","audio","video"],["audio","video"],function(a,e){var r=a[0].tagName.toLowerCase();if("audio"===r||"video"===r){var o=a.find("data-src"),i=a.find("data-track"),n=0,c=function(){++n===o.length&&e(!1)},s=function(){var a=t(this),e=a[0].tagName.toLowerCase(),r=a.prop("attributes"),o=t("data-src"===e?"<source>":"<track>");"data-src"===e&&o.one("error",c),t.each(r,function(t,a){o.attr(a.name,a.value)}),a.replaceWith(o)};a.one("loadedmetadata",function(){e(!0)}).off("load error").attr("poster",a.attr("data-poster")),o.length?o.each(s):a.attr("data-src")?(t.each(a.attr("data-src").split(","),function(e,r){var o=r.split("|");a.append(t("<source>").one("error",c).attr({src:o[0].trim(),type:o[1].trim()}))}),this.config("removeAttribute")&&a.removeAttr("data-src")):e(!1),i.length&&i.each(s)}else e(!1)})}(window.jQuery||window.Zepto),function(t){t.lazy(["frame","iframe"],"iframe",function(a,e){var r=this;if("iframe"===a[0].tagName.toLowerCase()){var o=a.attr("data-error-detect");"true"!==o&&"1"!==o?(a.attr("src",a.attr("data-src")),r.config("removeAttribute")&&a.removeAttr("data-src data-error-detect")):t.ajax({url:a.attr("data-src"),dataType:"html",crossDomain:!0,xhrFields:{withCredentials:!0},success:function(t){a.html(t).attr("src",a.attr("data-src")),r.config("removeAttribute")&&a.removeAttr("data-src data-error-detect")},error:function(){e(!1)}})}else e(!1)})}(window.jQuery||window.Zepto),function(t){t.lazy("noop",function(){}),t.lazy("noop-success",function(t,a){a(!0)}),t.lazy("noop-error",function(t,a){a(!1)})}(window.jQuery||window.Zepto),function(t){function a(a,e,i){var n=a.prop("attributes"),c=t("<"+e+">");return t.each(n,function(t,a){"srcset"!==a.name&&a.name!==o||(a.value=r(a.value,i)),c.attr(a.name,a.value)}),a.replaceWith(c),c}function e(a,e,r){var o=t("<img>").one("load",function(){r(!0)}).one("error",function(){r(!1)}).appendTo(a).attr("src",e);o.complete&&o.load()}function r(t,a){if(a){var e=t.split(",");t="";for(var r=0,o=e.length;r<o;r++)t+=a+e[r].trim()+(r!==o-1?",":"")}return t}var o="data-src";t.lazy(["pic","picture"],["picture"],function(i,n){if("picture"===i[0].tagName.toLowerCase()){var c=i.find(o),s=i.find("data-img"),d=this.config("imageBase")||"";c.length?(c.each(function(){a(t(this),"source",d)}),1===s.length?(s=a(s,"img",d),s.on("load",function(){n(!0)}).on("error",function(){n(!1)}),s.attr("src",s.attr(o)),this.config("removeAttribute")&&s.removeAttr(o)):i.attr(o)?(e(i,d+i.attr(o),n),this.config("removeAttribute")&&i.removeAttr(o)):n(!1)):i.attr("data-srcset")?(t("<source>").attr({media:i.attr("data-media"),sizes:i.attr("data-sizes"),type:i.attr("data-type"),srcset:r(i.attr("data-srcset"),d)}).appendTo(i),e(i,d+i.attr(o),n),this.config("removeAttribute")&&i.removeAttr(o+" data-srcset data-media data-sizes data-type")):n(!1)}else n(!1)})}(window.jQuery||window.Zepto),function(t){t.lazy(["js","javascript","script"],"script",function(t,a){"script"===t[0].tagName.toLowerCase()?(t.attr("src",t.attr("data-src")),this.config("removeAttribute")&&t.removeAttr("data-src")):a(!1)})}(window.jQuery||window.Zepto),function(t){t.lazy("vimeo",function(t,a){"iframe"===t[0].tagName.toLowerCase()?(t.attr("src","https://player.vimeo.com/video/"+t.attr("data-src")),this.config("removeAttribute")&&t.removeAttr("data-src")):a(!1)})}(window.jQuery||window.Zepto),function(t){t.lazy(["yt","youtube"],function(t,a){if("iframe"===t[0].tagName.toLowerCase()){var e=/1|true/.test(t.attr("data-nocookie"));t.attr("src","https://www.youtube"+(e?"-nocookie":"")+".com/embed/"+t.attr("data-src")+"?rel=0&amp;showinfo=0"),this.config("removeAttribute")&&t.removeAttr("data-src")}else a(!1)})}(window.jQuery||window.Zepto);


! function(t) {
        t.fn.svgConvert = function(e) {
            var i = t.extend({
                    svgCleanupAttr: ["width", "height", "id", "x", "y", "xmlns", "xmlns:a", "xmlns:xlink", "xml:space", "enable-background", "version", "style"],
                    imgIncludeAttr: !0,
                    imgCleanupAttr: [],
                    removeClass: !0,
                    addClass: "svg-converted",
                    onComplete: function() {}
                }, e),
                n = this.selector,
                r = n.substring(1),
                o = t(n).length;
            i.imgCleanupAttr.push("alt", "src"), t(n).each(function(e) {
                var n = t(this),
                    s = n.attr("src"),
                    a = {};
                i.imgIncludeAttr && t.each(this.attributes, function() {
                    this.specified && 0 !== i.imgCleanupAttr.indexOf(this.name) && ("class" === this.name && i.removeClass && (this.value = this.value.replace(r + " ", "")), "class" === this.name && i.addClass && (this.value = this.value += " " + i.addClass), a[this.name] = this.value)
                }), t.get(s, function(r) {
                    var s = t(r).find("svg");
                    t.each(i.svgCleanupAttr, function(t, e) {
                        s.removeAttr(e)
                    }), i.imgIncludeAttr && t.each(a, function(t, e) {
                        s.attr(t, e)
                    }), n.replaceWith(t(r).find("svg")), e + 1 === o && i.onComplete.call(this)
                })
            })
        }
    }(jQuery),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.AOS = e()
    }(this, function() {
        "use strict";
        var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
            e = "Expected a function",
            i = NaN,
            n = "[object Symbol]",
            r = /^\s+|\s+$/g,
            o = /^[-+]0x[0-9a-f]+$/i,
            s = /^0b[01]+$/i,
            a = /^0o[0-7]+$/i,
            l = parseInt,
            c = "object" == typeof t && t && t.Object === Object && t,
            u = "object" == typeof self && self && self.Object === Object && self,
            h = c || u || Function("return this")(),
            p = Object.prototype.toString,
            d = Math.max,
            f = Math.min,
            m = function() {
                return h.Date.now()
            };

        function A(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }

        function g(t) {
            if ("number" == typeof t) return t;
            if (function(t) {
                    return "symbol" == typeof t || function(t) {
                        return !!t && "object" == typeof t
                    }(t) && p.call(t) == n
                }(t)) return i;
            if (A(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = A(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(r, "");
            var c = s.test(t);
            return c || a.test(t) ? l(t.slice(2), c ? 2 : 8) : o.test(t) ? i : +t
        }
        var v = function(t, i, n) {
                var r = !0,
                    o = !0;
                if ("function" != typeof t) throw new TypeError(e);
                return A(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o),
                    function(t, i, n) {
                        var r, o, s, a, l, c, u = 0,
                            h = !1,
                            p = !1,
                            v = !0;
                        if ("function" != typeof t) throw new TypeError(e);

                        function y(e) {
                            var i = r,
                                n = o;
                            return r = o = void 0, u = e, a = t.apply(n, i)
                        }

                        function _(t) {
                            var e = t - c;
                            return void 0 === c || e >= i || e < 0 || p && t - u >= s
                        }

                        function w() {
                            var t = m();
                            if (_(t)) return b(t);
                            l = setTimeout(w, function(t) {
                                var e = i - (t - c);
                                return p ? f(e, s - (t - u)) : e
                            }(t))
                        }

                        function b(t) {
                            return l = void 0, v && r ? y(t) : (r = o = void 0, a)
                        }

                        function x() {
                            var t = m(),
                                e = _(t);
                            if (r = arguments, o = this, c = t, e) {
                                if (void 0 === l) return function(t) {
                                    return u = t, l = setTimeout(w, i), h ? y(t) : a
                                }(c);
                                if (p) return l = setTimeout(w, i), y(c)
                            }
                            return void 0 === l && (l = setTimeout(w, i)), a
                        }
                        return i = g(i) || 0, A(n) && (h = !!n.leading, s = (p = "maxWait" in n) ? d(g(n.maxWait) || 0, i) : s, v = "trailing" in n ? !!n.trailing : v), x.cancel = function() {
                            void 0 !== l && clearTimeout(l), u = 0, r = c = o = l = void 0
                        }, x.flush = function() {
                            return void 0 === l ? a : b(m())
                        }, x
                    }(t, i, {
                        leading: r,
                        maxWait: i,
                        trailing: o
                    })
            },
            y = NaN,
            _ = "[object Symbol]",
            w = /^\s+|\s+$/g,
            b = /^[-+]0x[0-9a-f]+$/i,
            x = /^0b[01]+$/i,
            T = /^0o[0-7]+$/i,
            C = parseInt,
            k = "object" == typeof t && t && t.Object === Object && t,
            S = "object" == typeof self && self && self.Object === Object && self,
            P = k || S || Function("return this")(),
            E = Object.prototype.toString,
            D = Math.max,
            O = Math.min,
            I = function() {
                return P.Date.now()
            };

        function j(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }

        function M(t) {
            if ("number" == typeof t) return t;
            if (function(t) {
                    return "symbol" == typeof t || function(t) {
                        return !!t && "object" == typeof t
                    }(t) && E.call(t) == _
                }(t)) return y;
            if (j(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = j(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(w, "");
            var i = x.test(t);
            return i || T.test(t) ? C(t.slice(2), i ? 2 : 8) : b.test(t) ? y : +t
        }
        var R = function(t, e, i) {
                var n, r, o, s, a, l, c = 0,
                    u = !1,
                    h = !1,
                    p = !0;
                if ("function" != typeof t) throw new TypeError("Expected a function");

                function d(e) {
                    var i = n,
                        o = r;
                    return n = r = void 0, c = e, s = t.apply(o, i)
                }

                function f(t) {
                    var i = t - l;
                    return void 0 === l || i >= e || i < 0 || h && t - c >= o
                }

                function m() {
                    var t = I();
                    if (f(t)) return A(t);
                    a = setTimeout(m, function(t) {
                        var i = e - (t - l);
                        return h ? O(i, o - (t - c)) : i
                    }(t))
                }

                function A(t) {
                    return a = void 0, p && n ? d(t) : (n = r = void 0, s)
                }

                function g() {
                    var t = I(),
                        i = f(t);
                    if (n = arguments, r = this, l = t, i) {
                        if (void 0 === a) return function(t) {
                            return c = t, a = setTimeout(m, e), u ? d(t) : s
                        }(l);
                        if (h) return a = setTimeout(m, e), d(l)
                    }
                    return void 0 === a && (a = setTimeout(m, e)), s
                }
                return e = M(e) || 0, j(i) && (u = !!i.leading, o = (h = "maxWait" in i) ? D(M(i.maxWait) || 0, e) : o, p = "trailing" in i ? !!i.trailing : p), g.cancel = function() {
                    void 0 !== a && clearTimeout(a), c = 0, n = l = r = a = void 0
                }, g.flush = function() {
                    return void 0 === a ? s : A(I())
                }, g
            },
            B = function() {};

        function F(t) {
            t && t.forEach(function(t) {
                var e = Array.prototype.slice.call(t.addedNodes),
                    i = Array.prototype.slice.call(t.removedNodes);
                if (function t(e) {
                        var i = void 0,
                            n = void 0;
                        for (i = 0; i < e.length; i += 1) {
                            if ((n = e[i]).dataset && n.dataset.aos) return !0;
                            if (n.children && t(n.children)) return !0
                        }
                        return !1
                    }(e.concat(i))) return B()
            })
        }

        function L() {
            return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        }
        var z = function() {
                return !!L()
            },
            N = function(t, e) {
                var i = window.document,
                    n = new(L())(F);
                B = e, n.observe(i.documentElement, {
                    childList: !0,
                    subtree: !0,
                    removedNodes: !0
                })
            },
            $ = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            Q = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            H = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
                }
                return t
            },
            q = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            V = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            W = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            U = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

        function G() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        var X = new(function() {
                function t() {
                    $(this, t)
                }
                return Q(t, [{
                    key: "phone",
                    value: function() {
                        var t = G();
                        return !(!q.test(t) && !V.test(t.substr(0, 4)))
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var t = G();
                        return !(!W.test(t) && !U.test(t.substr(0, 4)))
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }, {
                    key: "ie11",
                    value: function() {
                        return "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style
                    }
                }]), t
            }()),
            Y = function(t, e) {
                var i = void 0;
                return X.ie11() ? (i = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, {
                    detail: e
                }) : i = new CustomEvent(t, {
                    detail: e
                }), document.dispatchEvent(i)
            },
            Z = function(t) {
                return t.forEach(function(t, e) {
                    return function(t, e) {
                        var i = t.options,
                            n = t.position,
                            r = t.node,
                            o = (t.data, function() {
                                t.animated && (function(t, e) {
                                    e && e.forEach(function(e) {
                                        return t.classList.remove(e)
                                    })
                                }(r, i.animatedClassNames), Y("aos:out", r), t.options.id && Y("aos:in:" + t.options.id, r), t.animated = !1)
                            });
                        i.mirror && e >= n.out && !i.once ? o() : e >= n.in ? t.animated || (function(t, e) {
                            e && e.forEach(function(e) {
                                return t.classList.add(e)
                            })
                        }(r, i.animatedClassNames), Y("aos:in", r), t.options.id && Y("aos:in:" + t.options.id, r), t.animated = !0) : t.animated && !i.once && o()
                    }(t, window.pageYOffset)
                })
            },
            J = function(t) {
                for (var e = 0, i = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e += t.offsetLeft - ("BODY" != t.tagName ? t.scrollLeft : 0), i += t.offsetTop - ("BODY" != t.tagName ? t.scrollTop : 0), t = t.offsetParent;
                return {
                    top: i,
                    left: e
                }
            },
            K = function(t, e, i) {
                var n = t.getAttribute("data-aos-" + e);
                if (void 0 !== n) {
                    if ("true" === n) return !0;
                    if ("false" === n) return !1
                }
                return n || i
            },
            tt = function() {
                var t = document.querySelectorAll("[data-aos]");
                return Array.prototype.map.call(t, function(t) {
                    return {
                        node: t
                    }
                })
            },
            et = [],
            it = !1,
            nt = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                mirror: !1,
                anchorPlacement: "top-bottom",
                startEvent: "DOMContentLoaded",
                animatedClassName: "aos-animate",
                initClassName: "aos-init",
                useClassNames: !1,
                disableMutationObserver: !1,
                throttleDelay: 99,
                debounceDelay: 50
            },
            rt = function() {
                return document.all && !window.atob
            },
            ot = function() {
                var t, e;
                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && (it = !0), it && (e = nt, (t = et).forEach(function(t, i) {
                    var n = K(t.node, "mirror", e.mirror),
                        r = K(t.node, "once", e.once),
                        o = K(t.node, "id"),
                        s = e.useClassNames && t.node.getAttribute("data-aos"),
                        a = [e.animatedClassName].concat(s ? s.split(" ") : []).filter(function(t) {
                            return "string" == typeof t
                        });
                    e.initClassName && t.node.classList.add(e.initClassName), t.position = { in : function(t, e, i) {
                            var n = window.innerHeight,
                                r = K(t, "anchor"),
                                o = K(t, "anchor-placement"),
                                s = Number(K(t, "offset", o ? 0 : e)),
                                a = o || i,
                                l = t;
                            r && document.querySelectorAll(r) && (l = document.querySelectorAll(r)[0]);
                            var c = J(l).top - n;
                            switch (a) {
                                case "top-bottom":
                                    break;
                                case "center-bottom":
                                    c += l.offsetHeight / 2;
                                    break;
                                case "bottom-bottom":
                                    c += l.offsetHeight;
                                    break;
                                case "top-center":
                                    c += n / 2;
                                    break;
                                case "center-center":
                                    c += n / 2 + l.offsetHeight / 2;
                                    break;
                                case "bottom-center":
                                    c += n / 2 + l.offsetHeight;
                                    break;
                                case "top-top":
                                    c += n;
                                    break;
                                case "bottom-top":
                                    c += n + l.offsetHeight;
                                    break;
                                case "center-top":
                                    c += n + l.offsetHeight / 2
                            }
                            return c + s
                        }(t.node, e.offset, e.anchorPlacement), out: n && function(t, e) {
                            window.innerHeight;
                            var i = K(t, "anchor"),
                                n = K(t, "offset", e),
                                r = t;
                            return i && document.querySelectorAll(i) && (r = document.querySelectorAll(i)[0]), J(r).top + r.offsetHeight - n
                        }(t.node, e.offset)
                    }, t.options = {
                        once: r,
                        mirror: n,
                        animatedClassNames: a,
                        id: o
                    }
                }), Z(et = t), window.addEventListener("scroll", v(function() {
                    Z(et, nt.once)
                }, nt.throttleDelay)))
            },
            st = function() {
                if (et = tt(), lt(nt.disable) || rt()) return at();
                ot()
            },
            at = function() {
                et.forEach(function(t, e) {
                    t.node.removeAttribute("data-aos"), t.node.removeAttribute("data-aos-easing"), t.node.removeAttribute("data-aos-duration"), t.node.removeAttribute("data-aos-delay"), nt.initClassName && t.node.classList.remove(nt.initClassName), nt.animatedClassName && t.node.classList.remove(nt.animatedClassName)
                })
            },
            lt = function(t) {
                return !0 === t || "mobile" === t && X.mobile() || "phone" === t && X.phone() || "tablet" === t && X.tablet() || "function" == typeof t && !0 === t()
            };
        return {
            init: function(t) {
                return nt = H(nt, t), et = tt(), nt.disableMutationObserver || z() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '), nt.disableMutationObserver = !0), nt.disableMutationObserver || N("[data-aos]", st), lt(nt.disable) || rt() ? at() : (document.querySelector("body").setAttribute("data-aos-easing", nt.easing), document.querySelector("body").setAttribute("data-aos-duration", nt.duration), document.querySelector("body").setAttribute("data-aos-delay", nt.delay), -1 === ["DOMContentLoaded", "load"].indexOf(nt.startEvent) ? document.addEventListener(nt.startEvent, function() {
                    ot(!0)
                }) : window.addEventListener("load", function() {
                    ot(!0)
                }), "DOMContentLoaded" === nt.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 && ot(!0), window.addEventListener("resize", R(ot, nt.debounceDelay, !0)), window.addEventListener("orientationchange", R(ot, nt.debounceDelay, !0)), et)
            },
            refresh: ot,
            refreshHard: st
        }
    }),
    function(t, e) {
        "function" == typeof define && define.amd ? define([], e) : "object" == typeof module && module.exports ? module.exports = e() : t.anime = e()
    }(this, () => {
        const t = {
                update: void 0,
                begin: void 0,
                run: void 0,
                complete: void 0,
                loop: 1,
                direction: "normal",
                autoplay: !0,
                offset: 0
            },
            e = {
                duration: 1e3,
                delay: 0,
                easing: "easeOutElastic",
                elasticity: 500,
                round: 0
            },
            i = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skewX", "skewY", "perspective"];
        let n;

        function r(t, e) {
            return t.indexOf(e) > -1
        }
        const o = {
                arr: t => Array.isArray(t),
                obj: t => r(Object.prototype.toString.call(t), "Object"),
                pth: t => o.obj(t) && t.hasOwnProperty("totalLength"),
                svg: t => t instanceof SVGElement,
                dom: t => t.nodeType || o.svg(t),
                str: t => "string" == typeof t,
                fnc: t => "function" == typeof t,
                und: t => void 0 === t,
                hex: t => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t),
                rgb: t => /^rgb/.test(t),
                hsl: t => /^hsl/.test(t),
                col: t => o.hex(t) || o.rgb(t) || o.hsl(t)
            },
            s = (() => {
                const t = 11,
                    e = 1 / (t - 1);

                function i(t, e) {
                    return 1 - 3 * e + 3 * t
                }

                function n(t, e) {
                    return 3 * e - 6 * t
                }

                function r(t) {
                    return 3 * t
                }

                function o(t, e, o) {
                    return ((i(e, o) * t + n(e, o)) * t + r(e)) * t
                }

                function s(t, e, o) {
                    return 3 * i(e, o) * t * t + 2 * n(e, o) * t + r(e)
                }
                return function(i, n, r, a) {
                    if (!(0 <= i && i <= 1 && 0 <= r && r <= 1)) return;
                    let l = new Float32Array(t);
                    if (i !== n || r !== a)
                        for (let n = 0; n < t; ++n) l[n] = o(n * e, i, r);

                    function c(n) {
                        let a = 0,
                            c = 1;
                        const u = t - 1;
                        for (; c !== u && l[c] <= n; ++c) a += e;
                        const h = a + (n - l[--c]) / (l[c + 1] - l[c]) * e,
                            p = s(h, i, r);
                        return p >= .001 ? function(t, e, i, n) {
                            for (let r = 0; r < 4; ++r) {
                                const r = s(e, i, n);
                                if (0 === r) return e;
                                e -= (o(e, i, n) - t) / r
                            }
                            return e
                        }(n, h, i, r) : 0 === p ? h : function(t, e, i, n, r) {
                            let s, a, l = 0;
                            do {
                                (s = o(a = e + (i - e) / 2, n, r) - t) > 0 ? i = a : e = a
                            } while (Math.abs(s) > 1e-7 && ++l < 10);
                            return a
                        }(n, a, a + e, i, r)
                    }
                    return t => i === n && r === a ? t : 0 === t ? 0 : 1 === t ? 1 : o(c(t), n, a)
                }
            })(),
            a = (() => {
                const t = ["Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "Back", "Elastic"];

                function e(t, e) {
                    return 0 === t || 1 === t ? t : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - e / (2 * Math.PI) * Math.asin(1)) * (2 * Math.PI) / e)
                }
                const i = {
                    In: [
                        [.55, .085, .68, .53],
                        [.55, .055, .675, .19],
                        [.895, .03, .685, .22],
                        [.755, .05, .855, .06],
                        [.47, 0, .745, .715],
                        [.95, .05, .795, .035],
                        [.6, .04, .98, .335],
                        [.6, -.28, .735, .045], e
                    ],
                    Out: [
                        [.25, .46, .45, .94],
                        [.215, .61, .355, 1],
                        [.165, .84, .44, 1],
                        [.23, 1, .32, 1],
                        [.39, .575, .565, 1],
                        [.19, 1, .22, 1],
                        [.075, .82, .165, 1],
                        [.175, .885, .32, 1.275], (t, i) => 1 - e(1 - t, i)
                    ],
                    InOut: [
                        [.455, .03, .515, .955],
                        [.645, .045, .355, 1],
                        [.77, 0, .175, 1],
                        [.86, 0, .07, 1],
                        [.445, .05, .55, .95],
                        [1, 0, 0, 1],
                        [.785, .135, .15, .86],
                        [.68, -.55, .265, 1.55], (t, i) => t < .5 ? e(2 * t, i) / 2 : 1 - e(-2 * t + 2, i) / 2
                    ]
                };
                let n = {
                    linear: s(.25, .25, .75, .75)
                };
                for (let e in i) i[e].forEach((i, r) => {
                    n["ease" + e + t[r]] = o.fnc(i) ? i : s.apply(this, i)
                });
                return n
            })();

        function l(t) {
            if (!o.col(t)) try {
                return document.querySelectorAll(t)
            } catch (t) {
                return
            }
        }

        function c(t, e) {
            const i = t.length,
                n = arguments.length >= 2 ? arguments[1] : void 0;
            let r = [];
            for (let o = 0; o < i; o++)
                if (o in t) {
                    const i = t[o];
                    e.call(n, i, o, t) && r.push(i)
                }
            return r
        }

        function u(t) {
            return t.reduce((t, e) => t.concat(o.arr(e) ? u(e) : e), [])
        }

        function h(t) {
            return o.arr(t) ? t : (o.str(t) && (t = l(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t])
        }

        function p(t, e) {
            return t.some(t => t === e)
        }

        function d(t) {
            let e = {};
            for (let i in t) e[i] = t[i];
            return e
        }

        function f(t, e) {
            let i = d(t);
            for (let n in t) i[n] = e.hasOwnProperty(n) ? e[n] : t[n];
            return i
        }

        function m(t, e) {
            let i = d(t);
            for (let n in e) i[n] = o.und(t[n]) ? e[n] : t[n];
            return i
        }

        function A(t) {
            return o.rgb(t) ? function(t) {
                const e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);
                return e ? `rgba(${e[1]},1)` : t
            }(t) : o.hex(t) ? function(t) {
                const e = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (t, e, i, n) => e + e + i + i + n + n),
                    i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return `rgba(${parseInt(i[1],16)},${parseInt(i[2],16)},${parseInt(i[3],16)},1)`
            }(t) : o.hsl(t) ? function(t) {
                const e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                    i = parseInt(e[1]) / 360,
                    n = parseInt(e[2]) / 100,
                    r = parseInt(e[3]) / 100,
                    o = e[4] || 1;

                function s(t, e, i) {
                    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
                }
                let a, l, c;
                if (0 == n) a = l = c = r;
                else {
                    const t = r < .5 ? r * (1 + n) : r + n - r * n,
                        e = 2 * r - t;
                    a = s(e, t, i + 1 / 3), l = s(e, t, i), c = s(e, t, i - 1 / 3)
                }
                return `rgba(${255*a},${255*l},${255*c},${o})`
            }(t) : void 0
        }

        function g(t) {
            const e = /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
            if (e) return e[2]
        }

        function v(t, e, i) {
            return Math.min(Math.max(t, e), i)
        }

        function y(t, e) {
            return o.fnc(t) ? t(e.target, e.id, e.total) : t
        }

        function _(t, e) {
            if (e in t.style) return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0"
        }

        function w(t, e) {
            return o.dom(t) && p(i, e) ? "transform" : o.dom(t) && (t.getAttribute(e) || o.svg(t) && t[e]) ? "attribute" : o.dom(t) && "transform" !== e && _(t, e) ? "css" : null != t[e] ? "object" : void 0
        }

        function b(t, e) {
            const i = function(t) {
                    return r(t, "translate") || "perspective" === t ? "px" : r(t, "rotate") || r(t, "skew") ? "deg" : void 0
                }(e),
                n = r(e, "scale") ? 1 : 0 + i,
                o = t.style.transform;
            if (!o) return n;
            let s = [],
                a = [],
                l = [];
            const u = /(\w+)\((.+?)\)/g;
            for (; s = u.exec(o);) a.push(s[1]), l.push(s[2]);
            const h = c(l, (t, i) => a[i] === e);
            return h.length ? h[0] : n
        }

        function x(t, e) {
            switch (w(t, e)) {
                case "transform":
                    return b(t, e);
                case "css":
                    return _(t, e);
                case "attribute":
                    return t.getAttribute(e)
            }
            return t[e] || 0
        }

        function T(t, e) {
            const i = /^(\*=|\+=|-=)/.exec(t);
            if (!i) return t;
            const n = g(t) || 0,
                r = parseFloat(e),
                o = parseFloat(t.replace(i[0], ""));
            switch (i[0][0]) {
                case "+":
                    return r + o + n;
                case "-":
                    return r - o + n;
                case "*":
                    return r * o + n
            }
        }

        function C(t, e) {
            return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
        }

        function k(t) {
            const e = t.points;
            let i, n = 0;
            for (let t = 0; t < e.numberOfItems; t++) {
                const r = e.getItem(t);
                t > 0 && (n += C(i, r)), i = r
            }
            return n
        }

        function S(t) {
            if (t.getTotalLength) return t.getTotalLength();
            switch (t.tagName.toLowerCase()) {
                case "circle":
                    return function(t) {
                        return 2 * Math.PI * t.getAttribute("r")
                    }(t);
                case "rect":
                    return function(t) {
                        return 2 * t.getAttribute("width") + 2 * t.getAttribute("height")
                    }(t);
                case "line":
                    return function(t) {
                        return C({
                            x: t.getAttribute("x1"),
                            y: t.getAttribute("y1")
                        }, {
                            x: t.getAttribute("x2"),
                            y: t.getAttribute("y2")
                        })
                    }(t);
                case "polyline":
                    return k(t);
                case "polygon":
                    return function(t) {
                        const e = t.points;
                        return k(t) + C(e.getItem(e.numberOfItems - 1), e.getItem(0))
                    }(t)
            }
        }

        function P(t, e) {
            function i(i = 0) {
                const n = e + i >= 1 ? e + i : 0;
                return t.el.getPointAtLength(n)
            }
            const n = i(),
                r = i(-1),
                o = i(1);
            switch (t.property) {
                case "x":
                    return n.x;
                case "y":
                    return n.y;
                case "angle":
                    return 180 * Math.atan2(o.y - r.y, o.x - r.x) / Math.PI
            }
        }

        function E(t, e) {
            const i = /-?\d*\.?\d+/g,
                n = function(t, e) {
                    if (o.col(t)) return A(t);
                    const i = g(t),
                        n = i ? t.substr(0, t.length - i.length) : t;
                    return e && !/\s/g.test(t) ? n + e : n
                }(o.pth(t) ? t.totalLength : t, e) + "";
            return {
                original: n,
                numbers: n.match(i) ? n.match(i).map(Number) : [0],
                strings: o.str(t) || e ? n.split(i) : []
            }
        }

        function D(t) {
            return c(t ? u(o.arr(t) ? t.map(h) : h(t)) : [], (t, e, i) => i.indexOf(t) === e)
        }

        function O(t, e) {
            let i = d(e);
            if (o.arr(t)) {
                const n = t.length;
                2 === n && !o.obj(t[0]) ? t = {
                    value: t
                } : o.fnc(e.duration) || (i.duration = e.duration / n)
            }
            return h(t).map((t, i) => {
                const n = i ? 0 : e.delay;
                let r = o.obj(t) && !o.pth(t) ? t : {
                    value: t
                };
                return o.und(r.delay) && (r.delay = n), r
            }).map(t => m(t, i))
        }

        function I(t, e) {
            let i;
            return t.tweens.map(n => {
                let r = function(t, e) {
                    let i = {};
                    for (let n in t) {
                        let r = y(t[n], e);
                        o.arr(r) && 1 === (r = r.map(t => y(t, e))).length && (r = r[0]), i[n] = r
                    }
                    return i.duration = parseFloat(i.duration), i.delay = parseFloat(i.delay), i
                }(n, e);
                const l = r.value,
                    c = x(e.target, t.name),
                    u = i ? i.to.original : c,
                    h = o.arr(l) ? l[0] : u,
                    p = T(o.arr(l) ? l[1] : l, h),
                    d = g(p) || g(h) || g(c);
                return r.from = E(h, d), r.to = E(p, d), r.start = i ? i.end : t.offset, r.end = r.start + r.delay + r.duration, r.easing = function(t) {
                    return o.arr(t) ? s.apply(this, t) : a[t]
                }(r.easing), r.elasticity = (1e3 - v(r.elasticity, 1, 999)) / 1e3, r.isPath = o.pth(l), r.isColor = o.col(r.from.original), r.isColor && (r.round = 1), i = r, r
            })
        }
        const j = {
            css: (t, e, i) => t.style[e] = i,
            attribute: (t, e, i) => t.setAttribute(e, i),
            object: (t, e, i) => t[e] = i,
            transform: (t, e, i, n, r) => {
                n[r] || (n[r] = []), n[r].push(`${e}(${i})`)
            }
        };

        function M(t, e) {
            return c(u(t.map(t => e.map(e => (function(t, e) {
                const i = w(t.target, e.name);
                if (i) {
                    const n = I(e, t);
                    return {
                        type: i,
                        property: e.name,
                        animatable: t,
                        tweens: n,
                        duration: n[n.length - 1].end,
                        delay: n[0].delay
                    }
                }
            })(t, e)))), t => !o.und(t))
        }

        function R(t, e, i, n) {
            const r = "delay" === t;
            return e.length ? (r ? Math.min : Math.max).apply(Math, e.map(e => e[t])) : r ? n.delay : i.offset + n.delay + n.duration
        }

        function B(i) {
            const n = f(t, i),
                r = f(e, i),
                o = function(t) {
                    const e = D(t);
                    return e.map((t, i) => ({
                        target: t,
                        id: i,
                        total: e.length
                    }))
                }(i.targets),
                s = M(o, function(t, e, i) {
                    let n = [];
                    const r = m(t, e);
                    for (let t in i) r.hasOwnProperty(t) || "targets" === t || n.push({
                        name: t,
                        offset: r.offset,
                        tweens: O(i[t], e)
                    });
                    return n
                }(n, r, i));
            return m(n, {
                children: [],
                animatables: o,
                animations: s,
                duration: R("duration", s, n, r),
                delay: R("delay", s, n, r)
            })
        }
        let F = [],
            L = 0;
        const z = (() => {
            function t() {
                L = requestAnimationFrame(e)
            }

            function e(e) {
                const i = F.length;
                if (i) {
                    let n = 0;
                    for (; n < i;) F[n] && F[n].tick(e), n++;
                    t()
                } else cancelAnimationFrame(L), L = 0
            }
            return t
        })();

        function N(t = {}) {
            let e, i, r = 0,
                o = null;

            function s() {
                return window.Promise && new Promise(t => o = t)
            }
            let a = s(),
                l = B(t);

            function u() {
                l.reversed = !l.reversed
            }

            function h(t) {
                return l.reversed ? l.duration - t : t
            }

            function p(t) {
                let e = 0,
                    i = {};
                const r = l.animations,
                    o = r.length;
                for (; e < o;) {
                    const n = r[e],
                        o = n.animatable,
                        s = n.tweens,
                        a = s.length - 1;
                    let l = s[a];
                    a && (l = c(s, e => t < e.end)[0] || l);
                    const u = v(t - l.start - l.delay, 0, l.duration) / l.duration,
                        h = isNaN(u) ? 1 : l.easing(u, l.elasticity),
                        p = l.to.strings,
                        d = l.round;
                    let f, m = [];
                    const A = l.to.numbers.length;
                    for (let t = 0; t < A; t++) {
                        let e;
                        const i = l.to.numbers[t],
                            n = l.from.numbers[t];
                        e = l.isPath ? P(l.value, h * i) : n + h * (i - n), d && (l.isColor && t > 2 || (e = Math.round(e * d) / d)), m.push(e)
                    }
                    const g = p.length;
                    if (g) {
                        f = p[0];
                        for (let t = 0; t < g; t++) {
                            p[t];
                            const e = p[t + 1],
                                i = m[t];
                            isNaN(i) || (f += e ? i + e : i + " ")
                        }
                    } else f = m[0];
                    j[n.type](o.target, n.property, f, i, o.id), n.currentValue = f, e++
                }
                const s = Object.keys(i).length;
                if (s)
                    for (let t = 0; t < s; t++) {
                        if (!n) {
                            const t = "transform";
                            n = _(document.body, t) ? t : `-webkit-${t}`
                        }
                        l.animatables[t].target.style[n] = i[t].join(" ")
                    }
                l.currentTime = t, l.progress = t / l.duration * 100
            }

            function d(t) {
                l[t] && l[t](l)
            }

            function f() {
                l.remaining && !0 !== l.remaining && l.remaining--
            }

            function m(t) {
                const n = l.duration,
                    c = l.offset,
                    m = c + l.delay,
                    A = l.currentTime,
                    g = l.reversed,
                    v = h(t);
                l.children.length && function(t) {
                    const e = l.children,
                        i = e.length;
                    if (t >= l.currentTime)
                        for (let n = 0; n < i; n++) e[n].seek(t);
                    else
                        for (let n = i; n--;) e[n].seek(t)
                }(v), (v >= m || !n) && (l.began || (l.began = !0, d("begin")), d("run")), v > c && v < n ? p(v) : (v <= c && 0 !== A && (p(0), g && f()), (v >= n && A !== n || !n) && (p(n), g || f())), d("update"), t >= n && (l.remaining ? (i = e, "alternate" === l.direction && u()) : (l.pause(), l.completed || (l.completed = !0, d("complete"), "Promise" in window && (o(), a = s()))), r = 0)
            }
            return l.reset = function() {
                const t = l.direction,
                    e = l.loop;
                l.currentTime = 0, l.progress = 0, l.paused = !0, l.began = !1, l.completed = !1, l.reversed = "reverse" === t, l.remaining = "alternate" === t && 1 === e ? 2 : e, p(0);
                for (let t = l.children.length; t--;) l.children[t].reset()
            }, l.tick = function(t) {
                e = t, i || (i = e), m((r + e - i) * N.speed)
            }, l.seek = function(t) {
                m(h(t))
            }, l.pause = function() {
                const t = F.indexOf(l);
                t > -1 && F.splice(t, 1), l.paused = !0
            }, l.play = function() {
                l.paused && (l.paused = !1, i = 0, r = h(l.currentTime), F.push(l), L || z())
            }, l.reverse = function() {
                u(), i = 0, r = h(l.currentTime)
            }, l.restart = function() {
                l.pause(), l.reset(), l.play()
            }, l.finished = a, l.reset(), l.autoplay && l.play(), l
        }
        return N.version = "2.2.0", N.speed = 1, N.running = F, N.remove = function(t) {
            const e = D(t);
            for (let t = F.length; t--;) {
                const i = F[t],
                    n = i.animations;
                for (let t = n.length; t--;) p(e, n[t].animatable.target) && (n.splice(t, 1), n.length || i.pause())
            }
        }, N.getValue = x, N.path = function(t, e) {
            const i = o.str(t) ? l(t)[0] : t,
                n = e || 100;
            return function(t) {
                return {
                    el: i,
                    property: t,
                    totalLength: S(i) * (n / 100)
                }
            }
        }, N.setDashoffset = function(t) {
            const e = S(t);
            return t.setAttribute("stroke-dasharray", e), e
        }, N.bezier = s, N.easings = a, N.timeline = function(t) {
            let i = N(t);
            return i.pause(), i.duration = 0, i.add = function(n) {
                return i.children.forEach(t => {
                    t.began = !0, t.completed = !0
                }), h(n).forEach(n => {
                    let r = m(n, f(e, t || {}));
                    r.targets = r.targets || t.targets;
                    const s = i.duration,
                        a = r.offset;
                    r.autoplay = !1, r.direction = i.direction, r.offset = o.und(a) ? s : T(a, s), i.began = !0, i.completed = !0, i.seek(r.offset);
                    const l = N(r);
                    l.began = !0, l.completed = !0, l.duration > s && (i.duration = l.duration), i.children.push(l)
                }), i.seek(0), i.reset(), i.autoplay && i.restart(), i
            }, i
        }, N.random = ((t, e) => Math.floor(Math.random() * (e - t + 1)) + t), N
    }),
    function(t, e, i, n) {
        function r(e, i) {
            this.settings = null, this.options = t.extend({}, r.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {
                    start: null,
                    current: null
                },
                direction: null
            }, this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"]
                }
            }, t.each(["onResize", "onThrottledResize"], t.proxy(function(e, i) {
                this._handlers[i] = t.proxy(this[i], this)
            }, this)), t.each(r.Plugins, t.proxy(function(t, e) {
                this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
            }, this)), t.each(r.Workers, t.proxy(function(e, i) {
                this._pipe.push({
                    filter: i.filter,
                    run: t.proxy(i.run, this)
                })
            }, this)), this.setup(), this.initialize()
        }
        r.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            checkVisibility: !0,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: "swing",
            slideTransition: "",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        }, r.Width = {
            Default: "default",
            Inner: "inner",
            Outer: "outer"
        }, r.Type = {
            Event: "event",
            State: "state"
        }, r.Plugins = {}, r.Workers = [{
            filter: ["width", "settings"],
            run: function() {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = this.settings.margin || "",
                    i = !this.settings.autoWidth,
                    n = this.settings.rtl,
                    r = {
                        width: "auto",
                        "margin-left": n ? e : "",
                        "margin-right": n ? "" : e
                    };
                !i && this.$stage.children().css(r), t.css = r
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
                    i = null,
                    n = this._items.length,
                    r = !this.settings.autoWidth,
                    o = [];
                for (t.items = {
                        merge: !1,
                        width: e
                    }; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = i > 1 || t.items.merge, o[n] = r ? e * i : this._items[n].width();
                this._widths = o
            }
        }, {
            filter: ["items", "settings"],
            run: function() {
                var e = [],
                    i = this._items,
                    n = this.settings,
                    r = Math.max(2 * n.items, 4),
                    o = 2 * Math.ceil(i.length / 2),
                    s = n.loop && i.length ? n.rewind ? r : Math.max(r, o) : 0,
                    a = "",
                    l = "";
                for (s /= 2; s > 0;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l, s -= 1;
                this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, i = -1, n = 0, r = 0, o = []; ++i < e;) n = o[i - 1] || 0, r = this._widths[this.relative(i)] + this.settings.margin, o.push(n + r * t);
                this._coordinates = o
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function() {
                var t = this.settings.stagePadding,
                    e = this._coordinates,
                    i = {
                        width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                        "padding-left": t || "",
                        "padding-right": t || ""
                    };
                this.$stage.css(i)
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                var e = this._coordinates.length,
                    i = !this.settings.autoWidth,
                    n = this.$stage.children();
                if (i && t.items.merge)
                    for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css);
                else i && (t.css.width = t.items.width, n.css(t.css))
            }
        }, {
            filter: ["items"],
            run: function() {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"],
            run: function(t) {
                t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
            }
        }, {
            filter: ["position"],
            run: function() {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"],
            run: function() {
                var t, e, i, n, r = this.settings.rtl ? 1 : -1,
                    o = 2 * this.settings.stagePadding,
                    s = this.coordinates(this.current()) + o,
                    a = s + this.width() * r,
                    l = [];
                for (i = 0, n = this._coordinates.length; i < n; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && l.push(i);
                this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
            }
        }], r.prototype.initializeStage = function() {
            this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ">", {
                class: this.settings.stageClass
            }).wrap(t("<div/>", {
                class: this.settings.stageOuterClass
            })), this.$element.append(this.$stage.parent()))
        }, r.prototype.initializeItems = function() {
            var e = this.$element.find(".owl-item");
            if (e.length) return this._items = e.get().map(function(e) {
                return t(e)
            }), this._mergers = this._items.map(function() {
                return 1
            }), void this.refresh();
            this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
        }, r.prototype.initialize = function() {
            var t, e, i;
            (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : void 0, i = this.$element.children(e).width(), t.length && i <= 0 && this.preloadAutoWidthImages(t));
            this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
        }, r.prototype.isVisible = function() {
            return !this.settings.checkVisibility || this.$element.is(":visible")
        }, r.prototype.setup = function() {
            var e = this.viewport(),
                i = this.options.responsive,
                n = -1,
                r = null;
            i ? (t.each(i, function(t) {
                t <= e && t > n && (n = Number(t))
            }), "function" == typeof(r = t.extend({}, this.options, i[n])).stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : r = t.extend({}, this.options), this.trigger("change", {
                property: {
                    name: "settings",
                    value: r
                }
            }), this._breakpoint = n, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }, r.prototype.optionsLogic = function() {
            this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, r.prototype.prepare = function(e) {
            var i = this.trigger("prepare", {
                content: e
            });
            return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
                content: i.data
            }), i.data
        }, r.prototype.update = function() {
            for (var e = 0, i = this._pipe.length, n = t.proxy(function(t) {
                    return this[t]
                }, this._invalidated), r = {}; e < i;)(this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(r), e++;
            this._invalidated = {}, !this.is("valid") && this.enter("valid")
        }, r.prototype.width = function(t) {
            switch (t = t || r.Width.Default) {
                case r.Width.Inner:
                case r.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, r.prototype.refresh = function() {
            this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
        }, r.prototype.onThrottledResize = function() {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }, r.prototype.onResize = function() {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
        }, r.prototype.registerEventHandlers = function() {
            t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
                return !1
            })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
        }, r.prototype.onDragStart = function(e) {
            var n = null;
            3 !== e.which && (t.support.transform ? n = {
                x: (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === n.length ? 12 : 4],
                y: n[16 === n.length ? 13 : 5]
            } : (n = this.$stage.position(), n = {
                x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
                y: n.top
            }), this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
                var n = this.difference(this._drag.pointer, this.pointer(e));
                t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
            }, this)))
        }, r.prototype.onDragMove = function(t) {
            var e = null,
                i = null,
                n = null,
                r = this.difference(this._drag.pointer, this.pointer(t)),
                o = this.difference(this._drag.stage.start, r);
            this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), i = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % i + i) % i + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), i = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), n = this.settings.pullDrag ? -1 * r.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + n), i + n)), this._drag.stage.current = o, this.animate(o.x))
        }, r.prototype.onDragEnd = function(e) {
            var n = this.difference(this._drag.pointer, this.pointer(e)),
                r = this._drag.stage.current,
                o = n.x > 0 ^ this.settings.rtl ? "left" : "right";
            t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== n.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(n.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
                return !1
            })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
        }, r.prototype.closest = function(e, i) {
            var n = -1,
                r = this.width(),
                o = this.coordinates();
            return this.settings.freeDrag || t.each(o, t.proxy(function(t, s) {
                return "left" === i && e > s - 30 && e < s + 30 ? n = t : "right" === i && e > s - r - 30 && e < s - r + 30 ? n = t + 1 : this.op(e, "<", s) && this.op(e, ">", void 0 !== o[t + 1] ? o[t + 1] : s - r) && (n = "left" === i ? t + 1 : t), -1 === n
            }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? n = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (n = e = this.maximum())), n
        }, r.prototype.animate = function(e) {
            var i = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
            }) : i ? this.$stage.animate({
                left: e + "px"
            }, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
                left: e + "px"
            })
        }, r.prototype.is = function(t) {
            return this._states.current[t] && this._states.current[t] > 0
        }, r.prototype.current = function(t) {
            if (void 0 === t) return this._current;
            if (0 !== this._items.length) {
                if (t = this.normalize(t), this._current !== t) {
                    var e = this.trigger("change", {
                        property: {
                            name: "position",
                            value: t
                        }
                    });
                    void 0 !== e.data && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                        property: {
                            name: "position",
                            value: this._current
                        }
                    })
                }
                return this._current
            }
        }, r.prototype.invalidate = function(e) {
            return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function(t, e) {
                return e
            })
        }, r.prototype.reset = function(t) {
            void 0 !== (t = this.normalize(t)) && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
        }, r.prototype.normalize = function(t, e) {
            var i = this._items.length,
                n = e ? 0 : this._clones.length;
            return !this.isNumeric(t) || i < 1 ? t = void 0 : (t < 0 || t >= i + n) && (t = ((t - n / 2) % i + i) % i + n / 2), t
        }, r.prototype.relative = function(t) {
            return t -= this._clones.length / 2, this.normalize(t, !0)
        }, r.prototype.maximum = function(t) {
            var e, i, n, r = this.settings,
                o = this._coordinates.length;
            if (r.loop) o = this._clones.length / 2 + this._items.length - 1;
            else if (r.autoWidth || r.merge) {
                if (e = this._items.length)
                    for (i = this._items[--e].width(), n = this.$element.width(); e-- && !((i += this._items[e].width() + this.settings.margin) > n););
                o = e + 1
            } else o = r.center ? this._items.length - 1 : this._items.length - r.items;
            return t && (o -= this._clones.length / 2), Math.max(o, 0)
        }, r.prototype.minimum = function(t) {
            return t ? 0 : this._clones.length / 2
        }, r.prototype.items = function(t) {
            return void 0 === t ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
        }, r.prototype.mergers = function(t) {
            return void 0 === t ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
        }, r.prototype.clones = function(e) {
            var i = this._clones.length / 2,
                n = i + this._items.length,
                r = function(t) {
                    return t % 2 == 0 ? n + t / 2 : i - (t + 1) / 2
                };
            return void 0 === e ? t.map(this._clones, function(t, e) {
                return r(e)
            }) : t.map(this._clones, function(t, i) {
                return t === e ? r(i) : null
            })
        }, r.prototype.speed = function(t) {
            return void 0 !== t && (this._speed = t), this._speed
        }, r.prototype.coordinates = function(e) {
            var i, n = 1,
                r = e - 1;
            return void 0 === e ? t.map(this._coordinates, t.proxy(function(t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (this.settings.rtl && (n = -1, r = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[r] || 0)) / 2 * n) : i = this._coordinates[r] || 0, i = Math.ceil(i))
        }, r.prototype.duration = function(t, e, i) {
            return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
        }, r.prototype.to = function(t, e) {
            var i = this.current(),
                n = null,
                r = t - this.relative(i),
                o = (r > 0) - (r < 0),
                s = this._items.length,
                a = this.minimum(),
                l = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(r) > s / 2 && (r += -1 * o * s), (n = (((t = i + r) - a) % s + s) % s + a) !== t && n - r <= l && n - r > 0 && (i = n - r, t = n, this.reset(i))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(i, t, e)), this.current(t), this.isVisible() && this.update()
        }, r.prototype.next = function(t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t)
        }, r.prototype.prev = function(t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t)
        }, r.prototype.onTransitionEnd = function(t) {
            if (void 0 !== t && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
            this.leave("animating"), this.trigger("translated")
        }, r.prototype.viewport = function() {
            var n;
            return this.options.responsiveBaseElement !== e ? n = t(this.options.responsiveBaseElement).width() : e.innerWidth ? n = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? n = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), n
        }, r.prototype.replace = function(e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function() {
                return 1 === this.nodeType
            }).each(t.proxy(function(t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, r.prototype.add = function(e, i) {
            var n = this.relative(this._current);
            i = void 0 === i ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
                content: e,
                position: i
            }), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[n] && this.reset(this._items[n].index()), this.invalidate("items"), this.trigger("added", {
                content: e,
                position: i
            })
        }, r.prototype.remove = function(t) {
            void 0 !== (t = this.normalize(t, !0)) && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }))
        }, r.prototype.preloadAutoWidthImages = function(e) {
            e.each(t.proxy(function(e, i) {
                this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy(function(t) {
                    i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
            }, this))
        }, r.prototype.destroy = function() {
            for (var n in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[n].destroy();
            this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }, r.prototype.op = function(t, e, i) {
            var n = this.settings.rtl;
            switch (e) {
                case "<":
                    return n ? t > i : t < i;
                case ">":
                    return n ? t < i : t > i;
                case ">=":
                    return n ? t <= i : t >= i;
                case "<=":
                    return n ? t >= i : t <= i
            }
        }, r.prototype.on = function(t, e, i, n) {
            t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
        }, r.prototype.off = function(t, e, i, n) {
            t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
        }, r.prototype.trigger = function(e, i, n, o, s) {
            var a = {
                    item: {
                        count: this._items.length,
                        index: this.current()
                    }
                },
                l = t.camelCase(t.grep(["on", e, n], function(t) {
                    return t
                }).join("-").toLowerCase()),
                c = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
                    relatedTarget: this
                }, a, i));
            return this._supress[e] || (t.each(this._plugins, function(t, e) {
                e.onTrigger && e.onTrigger(c)
            }), this.register({
                type: r.Type.Event,
                name: e
            }), this.$element.trigger(c), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)), c
        }, r.prototype.enter = function(e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                void 0 === this._states.current[e] && (this._states.current[e] = 0), this._states.current[e] ++
            }, this))
        }, r.prototype.leave = function(e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
                this._states.current[e] --
            }, this))
        }, r.prototype.register = function(e) {
            if (e.type === r.Type.Event) {
                if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                    var i = t.event.special[e.name]._default;
                    t.event.special[e.name]._default = function(t) {
                        return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 : i.apply(this, arguments)
                    }, t.event.special[e.name].owl = !0
                }
            } else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(i, n) {
                return t.inArray(i, this._states.tags[e.name]) === n
            }, this)))
        }, r.prototype.suppress = function(e) {
            t.each(e, t.proxy(function(t, e) {
                this._supress[e] = !0
            }, this))
        }, r.prototype.release = function(e) {
            t.each(e, t.proxy(function(t, e) {
                delete this._supress[e]
            }, this))
        }, r.prototype.pointer = function(t) {
            var i = {
                x: null,
                y: null
            };
            return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
        }, r.prototype.isNumeric = function(t) {
            return !isNaN(parseFloat(t))
        }, r.prototype.difference = function(t, e) {
            return {
                x: t.x - e.x,
                y: t.y - e.y
            }
        }, t.fn.owlCarousel = function(e) {
            var i = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                var n = t(this),
                    o = n.data("owl.carousel");
                o || (o = new r(this, "object" == typeof e && e), n.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function(e, i) {
                    o.register({
                        type: r.Type.Event,
                        name: i
                    }), o.$element.on(i + ".owl.carousel.core", t.proxy(function(t) {
                        t.namespace && t.relatedTarget !== this && (this.suppress([i]), o[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
                    }, o))
                })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, i)
            })
        }, t.fn.owlCarousel.Constructor = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            autoRefresh: !0,
            autoRefreshInterval: 500
        }, r.prototype.watch = function() {
            this._interval || (this._visible = this._core.isVisible(), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }, r.prototype.refresh = function() {
            this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
        }, r.prototype.destroy = function() {
            var t, i;
            for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function(e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) {
                        var i = this._core.settings,
                            n = i.center && Math.ceil(i.items / 2) || i.items,
                            r = i.center && -1 * n || 0,
                            o = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + r,
                            s = this._core.clones().length,
                            a = t.proxy(function(t, e) {
                                this.load(e)
                            }, this);
                        for (i.lazyLoadEager > 0 && (n += i.lazyLoadEager, i.loop && (o -= i.lazyLoadEager, n++)); r++ < n;) this.load(s / 2 + this._core.relative(o)), s && t.each(this._core.clones(this._core.relative(o)), a), o++
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {
            lazyLoad: !1,
            lazyLoadEager: 0
        }, r.prototype.load = function(i) {
            var n = this._core.$stage.children().eq(i),
                r = n && n.find(".owl-lazy");
            !r || t.inArray(n.get(0), this._loaded) > -1 || (r.each(t.proxy(function(i, n) {
                var r, o = t(n),
                    s = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src") || o.attr("data-srcset");
                this._core.trigger("load", {
                    element: o,
                    url: s
                }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
                    o.css("opacity", 1), this._core.trigger("loaded", {
                        element: o,
                        url: s
                    }, "lazy")
                }, this)).attr("src", s) : o.is("source") ? o.one("load.owl.lazy", t.proxy(function() {
                    this._core.trigger("loaded", {
                        element: o,
                        url: s
                    }, "lazy")
                }, this)).attr("srcset", s) : ((r = new Image).onload = t.proxy(function() {
                    o.css({
                        "background-image": 'url("' + s + '")',
                        opacity: "1"
                    }), this._core.trigger("loaded", {
                        element: o,
                        url: s
                    }, "lazy")
                }, this), r.src = s)
            }, this)), this._loaded.push(n.get(0)))
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(i) {
            this._core = i, this._previousHeight = null, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && this.update()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
                }, this),
                "loaded.owl.lazy": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
            var n = this;
            t(e).on("load", function() {
                n._core.settings.autoHeight && n.update()
            }), t(e).resize(function() {
                n._core.settings.autoHeight && (null != n._intervalId && clearTimeout(n._intervalId), n._intervalId = setTimeout(function() {
                    n.update()
                }, 250))
            })
        };
        r.Defaults = {
            autoHeight: !1,
            autoHeightClass: "owl-height"
        }, r.prototype.update = function() {
            var e = this._core._current,
                i = e + this._core.settings.items,
                n = this._core.settings.lazyLoad,
                r = this._core.$stage.children().toArray().slice(e, i),
                o = [],
                s = 0;
            t.each(r, function(e, i) {
                o.push(t(i).height())
            }), (s = Math.max.apply(null, o)) <= 1 && n && this._previousHeight && (s = this._previousHeight), this._previousHeight = s, this._core.$stage.parent().height(s).addClass(this._core.settings.autoHeightClass)
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.register({
                        type: "state",
                        name: "playing",
                        tags: ["interacting"]
                    })
                }, this),
                "resize.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" === t.property.name && this._playing && this.stop()
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find(".owl-video");
                        i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
                this.play(t)
            }, this))
        };
        r.Defaults = {
            video: !1,
            videoHeight: !1,
            videoWidth: !1
        }, r.prototype.fetch = function(t, e) {
            var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
                n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                r = t.attr("data-width") || this._core.settings.videoWidth,
                o = t.attr("data-height") || this._core.settings.videoHeight,
                s = t.attr("href");
            if (!s) throw new Error("Missing video URL.");
            if ((n = s.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu") > -1) i = "youtube";
            else if (n[3].indexOf("vimeo") > -1) i = "vimeo";
            else {
                if (!(n[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                i = "vzaar"
            }
            n = n[6], this._videos[s] = {
                type: i,
                id: n,
                width: r,
                height: o
            }, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
        }, r.prototype.thumbnail = function(e, i) {
            var n, r, o = i.width && i.height ? "width:" + i.width + "px;height:" + i.height + "px;" : "",
                s = e.find("img"),
                a = "src",
                l = "",
                c = this._core.settings,
                u = function(i) {
                    '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? t("<div/>", {
                        class: "owl-video-tn " + l,
                        srcType: i
                    }) : t("<div/>", {
                        class: "owl-video-tn",
                        style: "opacity:1;background-image:url(" + i + ")"
                    }), e.after(n), e.after('<div class="owl-video-play-icon"></div>')
                };
            if (e.wrap(t("<div/>", {
                    class: "owl-video-wrapper",
                    style: o
                })), this._core.settings.lazyLoad && (a = "data-src", l = "owl-lazy"), s.length) return u(s.attr(a)), s.remove(), !1;
            "youtube" === i.type ? (r = "//img.youtube.com/vi/" + i.id + "/hqdefault.jpg", u(r)) : "vimeo" === i.type ? t.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    r = t[0].thumbnail_large, u(r)
                }
            }) : "vzaar" === i.type && t.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    r = t.framegrab_url, u(r)
                }
            })
        }, r.prototype.stop = function() {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
        }, r.prototype.play = function(e) {
            var i, n = t(e.target).closest("." + this._core.settings.itemClass),
                r = this._videos[n.attr("data-video")],
                o = r.width || "100%",
                s = r.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), n = this._core.items(this._core.relative(n.index())), this._core.reset(n.index()), (i = t('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", s), i.attr("width", o), "youtube" === r.type ? i.attr("src", "//www.youtube.com/embed/" + r.id + "?autoplay=1&rel=0&v=" + r.id) : "vimeo" === r.type ? i.attr("src", "//player.vimeo.com/video/" + r.id + "?autoplay=1") : "vzaar" === r.type && i.attr("src", "//view.vzaar.com/" + r.id + "/player?autoplay=true"), t(i).wrap('<div class="owl-video-frame" />').insertAfter(n.find(".owl-video")), this._playing = n.addClass("owl-video-playing"))
        }, r.prototype.isInFullScreen = function() {
            var e = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
            return e && t(e).parent().hasClass("owl-video-frame")
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
                "change.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this),
                "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function(t) {
                    t.namespace && (this.swapping = "translated" == t.type)
                }, this),
                "translate.owl.carousel": t.proxy(function(t) {
                    t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        r.Defaults = {
            animateOut: !1,
            animateIn: !1
        }, r.prototype.swap = function() {
            if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                this.core.speed(0);
                var e, i = t.proxy(this.clear, this),
                    n = this.core.$stage.children().eq(this.previous),
                    r = this.core.$stage.children().eq(this.next),
                    o = this.core.settings.animateIn,
                    s = this.core.settings.animateOut;
                this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(t.support.animation.end, i).css({
                    left: e + "px"
                }).addClass("animated owl-animated-out").addClass(s)), o && r.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(o))
            }
        }, r.prototype.clear = function(e) {
            t(e.target).css({
                left: ""
            }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = function(e) {
            this._core = e, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.autoplay && this.play()
                }, this),
                "play.owl.autoplay": t.proxy(function(t, e, i) {
                    t.namespace && this.play(e, i)
                }, this),
                "stop.owl.autoplay": t.proxy(function(t) {
                    t.namespace && this.stop()
                }, this),
                "mouseover.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "mouseleave.owl.autoplay": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this),
                "touchstart.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this),
                "touchend.owl.core": t.proxy(function() {
                    this._core.settings.autoplayHoverPause && this.play()
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, r.Defaults, this._core.options)
        };
        r.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, r.prototype._next = function(n) {
            this._call = e.setTimeout(t.proxy(this._next, this, n), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
        }, r.prototype.read = function() {
            return (new Date).getTime() - this._time
        }, r.prototype.play = function(i, n) {
            var r;
            this._core.is("rotating") || this._core.enter("rotating"), i = i || this._core.settings.autoplayTimeout, r = Math.min(this._time % (this._timeout || i), i), this._paused ? (this._time = this.read(), this._paused = !1) : e.clearTimeout(this._call), this._time += this.read() % i - r, this._timeout = i, this._call = e.setTimeout(t.proxy(this._next, this, n), i - r)
        }, r.prototype.stop = function() {
            this._core.is("rotating") && (this._time = 0, this._paused = !0, e.clearTimeout(this._call), this._core.leave("rotating"))
        }, r.prototype.pause = function() {
            this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, e.clearTimeout(this._call))
        }, r.prototype.destroy = function() {
            var t, e;
            for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        "use strict";
        var r = function(e) {
            this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function(e) {
                    e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                }, this),
                "added.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
                }, this),
                "remove.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this),
                "changed.owl.carousel": t.proxy(function(t) {
                    t.namespace && "position" == t.property.name && this.draw()
                }, this),
                "initialized.owl.carousel": t.proxy(function(t) {
                    t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
                }, this),
                "refreshed.owl.carousel": t.proxy(function(t) {
                    t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        r.Defaults = {
            nav: !1,
            navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, r.prototype.initialize = function() {
            var e, i = this._core.settings;
            for (e in this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function(t) {
                    this.prev(i.navSpeed)
                }, this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function(t) {
                    this.next(i.navSpeed)
                }, this)), i.dotsData || (this._templates = [t('<button role="button">').addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", t.proxy(function(e) {
                    var n = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                    e.preventDefault(), this.to(n, i.dotsSpeed)
                }, this)), this._overrides) this._core[e] = t.proxy(this[e], this)
        }, r.prototype.destroy = function() {
            var t, e, i, n, r;
            for (t in r = this._core.settings, this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) "$relative" === e && r.navContainer ? this._controls[e].html("") : this._controls[e].remove();
            for (n in this.overides) this._core[n] = this._overrides[n];
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, r.prototype.update = function() {
            var t, e, i = this._core.clones().length / 2,
                n = i + this._core.items().length,
                r = this._core.maximum(!0),
                o = this._core.settings,
                s = o.center || o.autoWidth || o.dotsData ? 1 : o.dotsEach || o.items;
            if ("page" !== o.slideBy && (o.slideBy = Math.min(o.slideBy, o.items)), o.dots || "page" == o.slideBy)
                for (this._pages = [], t = i, e = 0, 0; t < n; t++) {
                    if (e >= s || 0 === e) {
                        if (this._pages.push({
                                start: Math.min(r, t - i),
                                end: t - i + s - 1
                            }), Math.min(r, t - i) === r) break;
                        e = 0, 0
                    }
                    e += this._core.mergers(this._core.relative(t))
                }
        }, r.prototype.draw = function() {
            var e, i = this._core.settings,
                n = this._core.items().length <= i.items,
                r = this._core.relative(this._core.current()),
                o = i.loop || i.rewind;
            this._controls.$relative.toggleClass("disabled", !i.nav || n), i.nav && (this._controls.$previous.toggleClass("disabled", !o && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && r >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !i.dots || n), i.dots && (e = this._pages.length - this._controls.$absolute.children().length, i.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
        }, r.prototype.onTrigger = function(e) {
            var i = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
            }
        }, r.prototype.current = function() {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, t.proxy(function(t, i) {
                return t.start <= e && t.end >= e
            }, this)).pop()
        }, r.prototype.getPosition = function(e) {
            var i, n, r = this._core.settings;
            return "page" == r.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += r.slideBy : i -= r.slideBy), i
        }, r.prototype.next = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, r.prototype.prev = function(e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, r.prototype.to = function(e, i, n) {
            var r;
            !n && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        "use strict";
        var r = function(i) {
            this._core = i, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function(i) {
                    i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this),
                "prepared.owl.carousel": t.proxy(function(e) {
                    if (e.namespace) {
                        var i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!i) return;
                        this._hashes[i] = e.content
                    }
                }, this),
                "changed.owl.carousel": t.proxy(function(i) {
                    if (i.namespace && "position" === i.property.name) {
                        var n = this._core.items(this._core.relative(this._core.current())),
                            r = t.map(this._hashes, function(t, e) {
                                return t === n ? e : null
                            }).join();
                        if (!r || e.location.hash.slice(1) === r) return;
                        e.location.hash = r
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function(t) {
                var i = e.location.hash.substring(1),
                    n = this._core.$stage.children(),
                    r = this._hashes[i] && n.index(this._hashes[i]);
                void 0 !== r && r !== this._core.current() && this._core.to(this._core.relative(r), !1, !0)
            }, this))
        };
        r.Defaults = {
            URLhashListener: !1
        }, r.prototype.destroy = function() {
            var i, n;
            for (i in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(i, this._handlers[i]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = r
    }(window.Zepto || window.jQuery, window, document),
    function(t, e, i, n) {
        var r = t("<support>").get(0).style,
            o = "Webkit Moz O ms".split(" "),
            s = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend"
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend"
                    }
                }
            },
            a = function() {
                return !!u("transform")
            },
            l = function() {
                return !!u("perspective")
            },
            c = function() {
                return !!u("animation")
            };

        function u(e, i) {
            var s = !1,
                a = e.charAt(0).toUpperCase() + e.slice(1);
            return t.each((e + " " + o.join(a + " ") + a).split(" "), function(t, e) {
                if (r[e] !== n) return s = !i || e, !1
            }), s
        }

        function h(t) {
            return u(t, !0)
        }(function() {
            return !!u("transition")
        })() && (t.support.transition = new String(h("transition")), t.support.transition.end = s.transition.end[t.support.transition]), c() && (t.support.animation = new String(h("animation")), t.support.animation.end = s.animation.end[t.support.animation]), a() && (t.support.transform = new String(h("transform")), t.support.transform3d = l())
    }(window.Zepto || window.jQuery, window, document),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Splitting = e()
    }(this, function() {
        "use strict";
        var t = document,
            e = t.createTextNode.bind(t);

        function i(t, e, i) {
            t.style.setProperty(e, i)
        }

        function n(t, e) {
            return t.appendChild(e)
        }

        function r(e, i, r, o) {
            var s = t.createElement("span");
            return i && (s.className = i), r && (!o && s.setAttribute("data-" + i, r), s.textContent = r), e && n(e, s) || s
        }

        function o(t, e) {
            return t.getAttribute("data-" + e)
        }

        function s(e, i) {
            return e && 0 != e.length ? e.nodeName ? [e] : [].slice.call(e[0].nodeName ? e : (i || t).querySelectorAll(e)) : []
        }

        function a(t) {
            for (var e = []; t--;) e[t] = [];
            return e
        }

        function l(t, e) {
            t && t.some(e)
        }

        function c(t) {
            return function(e) {
                return t[e]
            }
        }
        var u = {};

        function h(t, e, i, n) {
            return {
                by: t,
                depends: e,
                key: i,
                split: n
            }
        }

        function p(t) {
            return function t(e, i, n) {
                var r = n.indexOf(e);
                if (-1 == r) n.unshift(e), l(u[e].depends, function(i) {
                    t(i, e, n)
                });
                else {
                    var o = n.indexOf(i);
                    n.splice(r, 1), n.splice(o, 0, e)
                }
                return n
            }(t, 0, []).map(c(u))
        }

        function d(t) {
            u[t.by] = t
        }

        function f(t, i, o, a, c) {
            t.normalize();
            var u = [],
                h = document.createDocumentFragment();
            a && u.push(t.previousSibling);
            var p = [];
            return s(t.childNodes).some(function(t) {
                if (!t.tagName || t.hasChildNodes()) {
                    if (t.childNodes && t.childNodes.length) return p.push(t), void u.push.apply(u, f(t, i, o, a, c));
                    var n = t.wholeText || "",
                        s = n.trim();
                    s.length && (" " === n[0] && p.push(e(" ")), l(s.split(o), function(t, e) {
                        e && c && p.push(r(h, "whitespace", " ", c));
                        var n = r(h, i, t);
                        u.push(n), p.push(n)
                    }), " " === n[n.length - 1] && p.push(e(" ")))
                } else p.push(t)
            }), l(p, function(t) {
                n(h, t)
            }), t.innerHTML = "", n(t, h), u
        }
        var m = h("words", 0, "word", function(t) {
                return f(t, "word", /\s+/, 0, 1)
            }),
            A = "chars",
            g = h(A, ["words"], "char", function(t, e, i) {
                var n = [];
                return l(i.words, function(t, i) {
                    n.push.apply(n, f(t, "char", "", e.whitespace && i))
                }), n
            });

        function v(t) {
            var e = (t = t || {}).key;
            return s(t.target || "[data-splitting]").map(function(n) {
                var r = n["🍌"];
                if (!t.force && r) return r;
                r = n["🍌"] = {
                    el: n
                };
                var s = p(t.by || o(n, "splitting") || A),
                    a = function(t, e) {
                        for (var i in e) t[i] = e[i];
                        return t
                    }({}, t);
                return l(s, function(t) {
                    if (t.split) {
                        var o = t.by,
                            s = (e ? "-" + e : "") + t.key,
                            c = t.split(n, a, r);
                        s && function(t, e, n) {
                            var r = "--" + e,
                                o = r + "-index";
                            l(n, function(t, e) {
                                Array.isArray(t) ? l(t, function(t) {
                                    i(t, o, e)
                                }) : i(t, o, e)
                            }), i(t, r + "-total", n.length)
                        }(n, s, c), r[o] = c, n.classList.add(o)
                    }
                }), n.classList.add("splitting"), r
            })
        }

        function y(t, e, i) {
            var n = s(e.matching || t.children, t),
                r = {};
            return l(n, function(t) {
                var e = Math.round(t[i]);
                (r[e] || (r[e] = [])).push(t)
            }), Object.keys(r).map(Number).sort(_).map(c(r))
        }

        function _(t, e) {
            return t - e
        }
        v.html = function(t) {
            var e = (t = t || {}).target = r();
            return e.innerHTML = t.content, v(t), e.outerHTML
        }, v.add = d;
        var w = h("lines", ["words"], "line", function(t, e, i) {
                return y(t, {
                    matching: i.words
                }, "offsetTop")
            }),
            b = h("items", 0, "item", function(t, e) {
                return s(e.matching || t.children, t)
            }),
            x = h("rows", 0, "row", function(t, e) {
                return y(t, e, "offsetTop")
            }),
            T = h("cols", 0, "col", function(t, e) {
                return y(t, e, "offsetLeft")
            }),
            C = h("grid", ["rows", "cols"]),
            k = h("layout", 0, 0, function(t, e) {
                var a = e.rows = +(e.rows || o(t, "rows") || 1),
                    l = e.columns = +(e.columns || o(t, "columns") || 1);
                if (e.image = e.image || o(t, "image") || t.currentSrc || t.src, e.image) {
                    var c = s("img", t)[0];
                    e.image = c && (c.currentSrc || c.src)
                }
                e.image && i(t, "background-image", "url(" + e.image + ")");
                for (var u = a * l, h = [], p = r(0, "cell-grid"); u--;) {
                    var d = r(p, "cell");
                    r(d, "cell-inner"), h.push(d)
                }
                return n(t, p), h
            }),
            S = h("cellRows", ["layout"], "row", function(t, e, i) {
                var n = e.rows,
                    r = a(n);
                return l(i.layout, function(t, e, i) {
                    r[Math.floor(e / (i.length / n))].push(t)
                }), r
            }),
            P = h("cellColumns", ["layout"], "col", function(t, e, i) {
                var n = e.columns,
                    r = a(n);
                return l(i.layout, function(t, e) {
                    r[e % n].push(t)
                }), r
            }),
            E = h("cells", ["cellRows", "cellColumns"], "cell", function(t, e, i) {
                return i.layout
            });
        return d(m), d(g), d(w), d(b), d(x), d(T), d(C), d(k), d(S), d(P), d(E), v
    });


(function($) {
	
	var t, e;
        t = this.jQuery || window.jQuery, e = t(window), 
		t.fn.stick_in_parent = function(i) {
            var n, r, o, s, a, l, c, u, h, p, d, f, m;
            for (null == i && (i = {}), p = i.sticky_class, s = i.inner_scrolling, h = i.recalc_every, u = i.parent, l = i.offset_top, a = i.spacer, o = i.bottoming, null == l && (l = 0), null == u && (u = void 0), null == s && (s = !0), null == p && (p = "is_stuck"), n = t(document), null == o && (o = !0), c = function(t) {
                    var e, i;
                    return window.getComputedStyle ? (t[0], e = window.getComputedStyle(t[0]), i = parseFloat(e.getPropertyValue("width")) + parseFloat(e.getPropertyValue("margin-left")) + parseFloat(e.getPropertyValue("margin-right")), "border-box" !== e.getPropertyValue("box-sizing") && (i += parseFloat(e.getPropertyValue("border-left-width")) + parseFloat(e.getPropertyValue("border-right-width")) + parseFloat(e.getPropertyValue("padding-left")) + parseFloat(e.getPropertyValue("padding-right"))), i) : t.outerWidth(!0)
                }, d = function(i, r, d, f, m, A, g, v) {
                    var y, _, w, b, x, T, C, k, S, P, E, D;
                    if (!i.data("sticky_kit")) {
                        if (i.data("sticky_kit", !0), x = n.height(), C = i.parent(), null != u && (C = C.closest(u)), !C.length) throw "failed to find stick parent";
                        if (w = !1, y = !1, (E = null != a ? a && i.closest(a) : t("<div />")) && E.css("position", i.css("position")), (k = function() {
                                var t, e, o;
                                if (!v) return x = n.height(), t = parseInt(C.css("border-top-width"), 10), e = parseInt(C.css("padding-top"), 10), r = parseInt(C.css("padding-bottom"), 10), d = C.offset().top + t + e, f = C.height(), w && (w = !1, y = !1, null == a && (i.insertAfter(E), E.detach()), i.css({
                                    position: "",
                                    top: "",
                                    width: "",
                                    bottom: ""
                                }).removeClass(p), o = !0), m = i.offset().top - (parseInt(i.css("margin-top"), 10) || 0) - l, A = i.outerHeight(!0), g = i.css("float"), E && E.css({
                                    width: c(i),
                                    height: A,
                                    display: i.css("display"),
                                    "vertical-align": i.css("vertical-align"),
                                    float: g
                                }), o ? D() : void 0
                            })(), A !== f) return b = void 0, T = l, P = h, D = function() {
                            var t, c, u, _, S, D;
                            if (!v) return u = !1, null != P && (P -= 1) <= 0 && (P = h, k(), u = !0), u || n.height() === x || (k(), u = !0), _ = e.scrollTop(), null != b && (c = _ - b), b = _, w ? (o && (S = _ + A + T > f + d, y && !S && (y = !1, i.css({
                                position: "fixed",
                                bottom: "",
                                top: T
                            }).trigger("sticky_kit:unbottom"))), _ < m && (w = !1, T = l, null == a && ("left" !== g && "right" !== g || i.insertAfter(E), E.detach()), t = {
                                position: "",
                                width: "",
                                top: ""
                            }, i.css(t).removeClass(p).trigger("sticky_kit:unstick")), s && (D = e.height(), A + l > D && (y || (T -= c, T = Math.max(D - A, T), T = Math.min(l, T), w && i.css({
                                top: T + "px"
                            }))))) : _ > m && (w = !0, (t = {
                                position: "fixed",
                                top: T
                            }).width = "border-box" === i.css("box-sizing") ? i.outerWidth() + "px" : i.width() + "px", i.css(t).addClass(p), null == a && (i.after(E), "left" !== g && "right" !== g || E.append(i)), i.trigger("sticky_kit:stick")), w && o && (null == S && (S = _ + A + T > f + d), !y && S) ? (y = !0, "static" === C.css("position") && C.css({
                                position: "relative"
                            }), i.css({
                                position: "absolute",
                                bottom: r,
                                top: "auto"
                            }).trigger("sticky_kit:bottom")) : void 0
                        }, S = function() {
                            return k(), D()
                        }, _ = function() {
                            if (v = !0, e.off("touchmove", D), e.off("scroll", D), e.off("resize", S), t(document.body).off("sticky_kit:recalc", S), i.off("sticky_kit:detach", _), i.removeData("sticky_kit"), i.css({
                                    position: "",
                                    bottom: "",
                                    top: "",
                                    width: ""
                                }), C.position("position", ""), w) return null == a && ("left" !== g && "right" !== g || i.insertAfter(E), E.remove()), i.removeClass(p)
                        }, e.on("touchmove", D), e.on("scroll", D), e.on("resize", S), t(document.body).on("sticky_kit:recalc", S), i.on("sticky_kit:detach", _), setTimeout(D, 0)
                    }
                }, f = 0, m = this.length; f < m; f++) r = this[f], d(t(r));
            return this
        }
	
var debug = {
        settings: {
            enabled: !1
        },
        output: function(t) {
            this.settings.enabled && console.log(t)
        }
    },
    viewport = {
        selectors: {
            window: jQuery(window)
        },
        getWidth: function() {
            return this.selectors.window.width()
        },
        getHeight: function() {
            return this.selectors.window.height()
        },
        getScroll: function() {
            return this.selectors.window.scrollTop()
        },
        init: function() {
            debug.output(this.getWidth()), debug.output(this.getHeight()), debug.output(this.getScroll())
        }
    },
    environment = {
        selectors: {
            html: jQuery("html")
        },
        browser: {
            name: null,
            version: null
        },
        device: {
            name: null
        },
        getBrowser: function() {
            null !== platform.name && (this.browser.name = platform.name.replace(/\s+/g, "-").toLowerCase(), this.browser.version = Math.round(parseInt(platform.version)), this.selectors.html.addClass("browser-" + this.browser.name), this.selectors.html.addClass("browser-" + this.browser.name + "-" + this.browser.version), debug.output(this.browser.name + "-" + this.browser.version))
        },
        getDevice: function() {
            null !== platform.product && (this.device.name = platform.product.replace(/\s+/g, "-").toLowerCase(), this.selectors.html.addClass("device-" + this.device.name), debug.output(this.device.name))
        },
        init: function() {
            //this.getBrowser(), this.getDevice()
        }
    },
	slideshow = {
        init: function() {
            $(".js-slideshow").length > 0 && $(".js-slideshow").each(function(t) {
                var e, i = $(this),
                    n = 550,
                    r = 0,
                    o = (i.data("slideshow-tabs"), i.data("slideshow-auto"), i.data("slideshow-type"));
                i.addClass("owl-carousel"), e = "default" === o ? {
                    smartSpeed: n,
                    items: 4,
                    nav: !1,
                    dots: !1,
                    loop: !1
                } : "carousel" == o ? {
                    smartSpeed: n,
                    nav: !1,
                    dots: !1,
                    loop: !0,
                    autoHeight: !0,
                    autoplay: !0,
                    autoplayTimeout: 3e3,
                    autoplaySpeed: 1200,
                    responsive: {
                        0: {
                            items: 2
                        },
                        600: {
                            items: 4
                        },
                        1024: {
                            items: 5
                        }
                    }
                } : "carousel-instagram" == o ? {
                    smartSpeed: n,
                    nav: !1,
                    dots: !1,
                    loop: !0,
                    autoHeight: !0,
                    responsive: {
                        0: {
                            items: 2
                        },
                        600: {
                            items: 4
                        },
                        1024: {
                            items: 6
                        },
                        1200: {
                            items: 8
                        }
                    }
                } : "carousel-logos" == o ? {
                    smartSpeed: n,
                    nav: !1,
                    dots: !1,
                    loop: !0,
                    autoplay: !0,
                    autoplayTimeout: 2500,
                    autoplaySpeed: 1200,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 3
                        },
                        1024: {
                            items: 4
                        },
                        1200: {
                            items: 4
                        }
                    }
                } : "slideshow-page-header" == o ? {
                    smartSpeed: n,
                    animateOut: "fadeOut",
                    items: 1,
                    nav: !1,
                    dots: !1,
                    loop: !0,
                    autoplay: !0,
                    autoplayTimeout: 4500,
                    autoplaySpeed: 1200
                } : {
                    smartSpeed: n,
                    items: 1,
                    nav: !1,
                    dots: !1,
                    loop: !1,
                    autoHeight: !0
                };
                var s = i.owlCarousel(e),
                    a = $("[data-slideshow-pagination=" + o + "]"),
                    l = $("[data-slideshow-next=" + o + "]"),
                    c = $("[data-slideshow-prev=" + o + "]"),
                    u = $(this).find(".owl-item").length,
                    h = $(this).find(".owl-item.cloned").length / 2,
                    p = u - 2 * h;

                function d(t) {
                    var e = t - h;
                    if (e < 0) {
                        var i = p - 1;
                        a.children("li[data-count=" + i + "]").addClass("is-active")
                    } else a.children("li[data-count=" + e + "]").addClass("is-active")
                }
                setTimeout(function() {
                    s.trigger("next.owl.carousel"), s.trigger("prev.owl.carousel")
                }, 1e3), i.on("resized.owl.carousel", function(t) {
                    s.trigger("next.owl.carousel"), s.trigger("prev.owl.carousel")
                }), a.children("li:first-child").addClass("is-active"), a.children("li").click(function(t) {
                    var e, i;
                    r = $(this).data("count"), i = (e = r) + h, s.trigger("to.owl.carousel", [e, n, !0]), d(i), t.preventDefault()
                }), s.on("change.owl.carousel", function(t) {
                    a.children("li").removeClass("is-active"), lazyLoad.init(), dominantColour.init()
                }), s.on("translate.owl.carousel", function(t) {
                    d(r = t.item.index)
                }), l.click(function(t) {
                    s.trigger("next.owl.carousel"), t.preventDefault()
                }), c.click(function(t) {
                    s.trigger("prev.owl.carousel"), t.preventDefault()
                })
            })
        }
    };
var windowResizeWidth = viewport.getWidth(),
    breakpoint = {
        small: 0,
        medium: 640,
        large: 1024,
        xlarge: 1200,
        xxlarge: 1440
    },
    state = {
        hidden: "is-hidden",
        visible: "is-visible",
        selected: "is-selected",
        active: "is-active",
        removed: "is-removed",
        processing: "is-processing",
        loading: "is-loading"
    },
    freeform = {
        init: function() {
            $(".type-checkbox_group label").click(function(t) {
                $(this).hasClass(state.active) ? ($(this).removeClass(state.active), $(this).children("input").prop("checked", !1)) : ($(this).addClass(state.active), $(this).children("input").prop("checked", !0)), t.preventDefault()
            }), $(".type-radio_group label").click(function(t) {
                $(this).siblings().removeClass(state.active), $(this).siblings().children("input").prop("checked", !1), $(this).addClass(state.active), $(this).children("input").prop("checked", !0), t.preventDefault()
            })
        }
    },
    filterTrigger = {
        init: function() {
            $(".js-filter-trigger").click(function(t) {
                $(this).hasClass(state.active) ? ($(this).removeClass(state.active), $(".js-filter-trigger-element").removeClass(state.active)) : ($(this).addClass(state.active), $(".js-filter-trigger-element").addClass(state.active)), t.preventDefault()
            })
        }
    },
    navigationOffcanvas = {
        init: function() {
            $(".js-navigation-offcanvas-trigger").click(function(t) {
                $(".js-navigation-offcanvas").hasClass(state.active) ? ($(this).removeClass(state.active), $(".js-navigation-offcanvas, .js-offcanvas-other").removeClass(state.active)) : ($(this).addClass(state.active), $(".js-navigation-offcanvas, .js-offcanvas-other").addClass(state.active)), t.preventDefault()
            })
        }
    },
    textRotate = {
        init: function() {
            var t = null;
            $(".js-text-rotate-trigger").click(function(e) {
                var i = $(this).next(".js-text-rotate").children(),
                    n = Math.floor(Math.random() * i.length);
                n === t && (n === i.length ? n = 0 : n += 1), t = n, i.removeClass("is-active"), i.eq(n).addClass("is-active"), e.preventDefault()
            })
        }
    },
    lightbox = {
        init: function() {
            $(".js-lightbox-video").magnificPopup({
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !0,
                closeMarkup: '<a href="#" class="mfp-close">&#215;</a>'
            })
        }
    },
    splitting = {
        init: function() {
            Splitting()
        }
    },
    attractHover = {
        init: function() {
            $.attractHover(".js-attract", {
                proximity: 20,
                magnetism: 4
            })
        }
    },
    inviewThemeChange = {
        init: function() {
            var t = $(".js-inview-theme-change-calculate").width(),
                e = ($(window).height() - t) / 2 + t / 2;
            $("[data-inview-theme-change]").each(function(t) {
                element = $(this);
                var i = scrollMonitor.create(element, {
                    top: -e,
                    bottom: -e
                });
                i.enterViewport(function() {
                    $("body").addClass("inview-theme-light")
                }), i.exitViewport(function() {
                    $("body").removeClass("inview-theme-light")
                })
            })
        }
    },
    lazyLoad = {
        init: function(t) {
            $(".js-lazy-load").Lazy();
            var e = $(".js-lazy-load, .js-dominant-colour").data("plugin_lazy");
            t && e.update()
        },
        update: function() {
            $(".js-lazy-load").data("plugin_lazy").update()
        }
    },
    dominantColour = {
        init: function(t) {
            $(".js-dominant-colour").each(function(t) {
                var e = $(this),
                    i = $(this).data("src");
                Vibrant.from(i).getPalette(function(t, i) {
                    i.Vibrant && e.parent().css("background-color", "rgba(" + i.Muted._rgb.join(",") + ",1)")
                }), t === $(".js-dominant-colour").length - 1 && $(".js-dominant-colour").Lazy()
            })
        },
        update: function() {
            $(".js-dominant-colour").data("plugin_lazy").update()
        }
    },
    cookieConsent = {
        init: function() {
            window.addEventListener("load", function() {
                window.cookieconsent.initialise({
                    palette: {
                        popup: {
                            background: "#252427",
                            text: "#ffffff"
                        },
                        button: {
                            background: "transparent",
                            text: "#f06062",
                            border: "#f06062"
                        }
                    }
                })
            })
        }
    },
    scrollTop = {
        init: function() {
            $(".js-scroll-top").click(function(t) {
                $("html, body").animate({
                    scrollTop: 0
                }, 500), t.preventDefault()
            })
        }
    },
    scrollTo = {
        init: function() {
            $(".js-scroll-to").click(function(t) {
                var e = $(this).data("scroll-id");
                $("html, body").stop().animate({
                    scrollTop: $(".js-scroll-to-target[data-scroll-id=" + e + "]").offset().top - 0
                }, 1400, "easeInOutExpo"), t.preventDefault()
            })
        }
    },
    sticky = {
        options: {
            offset_top: 15,
            recalc_every: 10
        },
        resize: function() {
            windowResizeWidth > breakpoint.large ? $(".js-sticky").stick_in_parent(sticky.options) : $(".js-sticky").trigger("sticky_kit:detach")
        },
        init: function() {
            windowResizeWidth > breakpoint.large && $(".js-sticky").stick_in_parent(sticky.options)
        }
    },
    comeBackTitle = {
        init: function() {
            /*var t = $("title"),
                e = t.text();
            $(window).blur(function() {
                // t.text("👋 " + e)
            }), $(window).focus(function() {
                t.text(e)
            })*/
        }
    },
    parallax = {
        init: function() {
            $(".js-paroller, [data-paroller-factor]").paroller({
                factor: .3,
                type: "foreground",
                direction: "vertical"
            }), $(".js-paroller-custom").paroller()
        }
    },
    blobs = {
        init: function() {
            $(".js-blob-mask").each(function(t) {
                var e = $(this),
                    i = $(this).data("blob-array").split(";"),
                    n = [{
                        duration: 5,
                        options: {
                            morphSVG: null,
                            x: 0,
                            y: 0,
                            rotation: -.1,
                            scale: 1
                        }
                    }, {
                        duration: 5,
                        options: {
                            morphSVG: null,
                            x: 0,
                            y: 0,
                            rotation: -.5,
                            scale: 1
                        }
                    }, {
                        duration: 5,
                        options: {
                            morphSVG: null,
                            x: 0,
                            y: 0,
                            rotation: -.2,
                            scale: 1
                        }
                    }];
                $.each(i, function(t, r) {
                    n[t].options.morphSVG = r, t + 1 === i.length && (e.removeAttr("data-blob-array"), function() {
                        var t = new TimelineMax({
                            repeat: -1,
                            yoyo: !0
                        });
                        for (var i in n) t.to(e, n[i].duration, n[i].options)
                    }())
                })
            })
        }
    },
    gutterShapes = {
        random: function(t, e) {
            return Math.random() * (e - t) + t
        },
        init: function() {
            var t = $(window).width(),
                e = $(".section-container").innerWidth(),
                i = (t - e) / 2,
                n = i - 30,
                r = i + e + 30,
                o = $(".js-gutter-shape-container").length;
            $(".js-gutter-shape-container").each(function(e) {
                var i = $(this).height(),
                    s = $(".gutter-shape", this).length;
                $(".gutter-shape", this).each(function(e) {
                    if (e < s / 2) var o = gutterShapes.random(30, n);
                    else o = gutterShapes.random(r, t - 30);
                    var a = gutterShapes.random(0, i);
                    $(this).css("left", o), $(this).css("top", a)
                }), e + 1 === o && $(".js-gutter-shape-container").addClass(state.active)
            })
        }
    },
    animateOnScroll = {
        init: function() {
            // AOS.init({
                // offset: 50,
                // once: !0,
                // mirror: !0,
                // disable: "phone"
            // })
        }
    },
    slideshowSlick = {
        init: function() {
            var t = $(".js-slideshow-slick"),
                e = $(".js-slideshow-slick-pagination"),
                i = $(".js-slideshow-slick-pagination a");
            t.on("init", function(t, i) {
                e.addClass(state.active)
            }), t.slick({
                dots: !1,
                arrows: !1,
                speed: 1e3,
                infinite: !0,
                speed: 500,
                fade: !0,
                cssEase: "linear",
                draggable: !1,
                lazyLoad: 'ondemand',
                autoplay: !0,
                autoplaySpeed: 4900,
                pauseOnHover: !1,
                pauseOnFocus: !1,
                responsive: [{
                    breakpoint: 960,
                    settings: {
                        waitForAnimate: !1,
                        pauseOnFocus: !1,
                        pauseOnHover: !1,
                        swipe: !1
                    }
                }]
            }), i.click(function(e) {
                var i = $(this).data("slideshow-slide-index");
                t.slick("slickGoTo", i), e.preventDefault()
            }), t.on("beforeChange", function(t, e, i, n) {
                $('.js-slideshow-slick-pagination a[data-slideshow-slide-index="' + i + '"]').removeClass(state.active), $('.js-slideshow-slick-pagination a[data-slideshow-slide-index="' + n + '"]').addClass(state.active)
            })
        }
    },
    grid = {
        init: function() {
            $(".js-grid").length && $(".js-grid").waitForImages().done(function() {
                $(".js-grid").packery({
                    itemSelector: ".js-grid-item"
                })
            }), $(".js-grid-random").length && $(".js-grid-random").waitForImages().done(function() {
                for (var t = document.querySelector(".js-grid-random"), e = new Packery(t, {
                        itemSelector: ".js-grid-item"
                    }), i = [], n = [], r = 0, o = e.items.length; r < o; r++) {
                    var s = e.items[r];
                    (classie.has(s.element, "ignore-shuffle") ? n : i).push(s)
                }
                i.sort(function() {
                    return Math.random() > .5
                }), e.items = n.concat(i), e.layout()
            })
        }
    },
    sectionInview = {
        init: function() {
            $(".js-scroll-inview").each(function(t) {
                element = $(this);
                var e = element.data("scroll-id");
                scrollMonitor.create(element, {
                    top: 0,
                    bottom: 0
                }).fullyEnterViewport(function() {
                    $(".js-scroll-to").removeClass(state.active), $(".js-scroll-to[data-scroll-id=" + e + "]").addClass(state.active)
                })
            })
        }
    },
	categoryInview = {
        init: function() {
            var headerImageWidth = 1927;
            var headerImageHeiht = 741;
            var windowWidth = $(document).width();
            headerImageDivHeiht = parseInt(windowWidth * 741 / 1927);
            $('.category-header').height(headerImageDivHeiht);
        }
    };
	jQuery(document).ready(function() {
		/* environment.init(),  */viewport.init(), animateOnScroll.init(), /*gutterShapes.init(), */slideshow.init(), /*parallax.init(), comeBackTitle.init(), *//*sticky.init(), scrollTop.init(), *//*grid.init(), *//*cookieConsent.init(),*/ lazyLoad.init(), dominantColour.init(), inviewThemeChange.init(), /*attractHover.init(), , lightbox.init(), textRotate.init(), */splitting.init(), slideshowSlick.init(), navigationOffcanvas.init(), /*filterTrigger.init(), freeform.init(), */scrollTo.init(), /*sectionInview.init(), */categoryInview.init()
	}), jQuery(window).resize(function() {
		jQuery(window).width() != windowResizeWidth && (windowResizeWidth = viewport.getWidth()), sticky.resize(), gutterShapes.init(), categoryInview.init()
	}), jQuery(window).scroll(function() {
		sectionInview.init()
	});
})(jQuery);
