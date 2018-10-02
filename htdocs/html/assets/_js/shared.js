;(function($) {

    function object(o) {
        var f = object.f, i, len, n, prop;
        f.prototype = o;
        n = new f;
        for (i=1, len=arguments.length; i<len; ++i){
            for (prop in arguments[i]) {
                n[prop] = arguments[i][prop];
            }
        }
        return n;
    };
    object.f = function(){};



    $.extend({


        navFix : function(){
            var nav = $('#js-global');

            if(!nav.length) return false;
            // var offsetTop = nav.get(0).offsetTop;
            var offsetTop = document.getElementById('js-global').offsetTop;
            console.log(offsetTop);

            var floatMenu = function() {
                if ($(window).scrollTop() > offsetTop) {
                    nav.addClass('fixed');
                } else {
                    nav.removeClass('fixed');
                }
            }
            $(window).scroll(floatMenu);
            $('body').bind('touchmove', floatMenu);
            var timer;
            $(window).on('resize',function(){
                if (timer !== false) {clearTimeout(timer);}
                timer = setTimeout(function() {
                        floatMenu();
                }, 100);
            });
        },

		pagetopBtn :function(){
			var $window = $(window);
			var $pageTop = $("#js-pageTop");
			var $footerEndArea = $("footer");
			var pagetopFlg = $pageTop.length;

			$pageTop.hide();
			var footerTop;
			if (pagetopFlg) {
				$window.on('load', function(e) {
					footerTop = ($footerEndArea.length > 0) ? $footerEndArea.offset().top : 0;
				});
			}
			$(window).resize(function() {
				footerTop = ($footerEndArea.length > 0) ? $footerEndArea.offset().top : 0;
			});
			$(window).scroll(function(){
				footerTop = ($footerEndArea.length > 0) ? $footerEndArea.offset().top : 0;
				var position = $(this).scrollTop() + $(this).height();
				if (position < footerTop) {
					$pageTop.removeClass("is-endPos");
				} else {
					$pageTop.addClass("is-endPos");
				}
				if($(this).scrollTop() > 30 ) {
					$pageTop.fadeIn(400);
				}else {
					$pageTop.fadeOut(200);
				}
			});
		},

        smoothScroll : function (){
            var $body = $("body");
            var headerHeight = $('#js-global').height();
            var url = $(location).attr('href');

            $('a[href^="#"]').not('.js-noScroll a, .js-noScroll, .js-lightBox, .selected').on("click", function(e) {
                e.preventDefault();
                var href= $(this).attr("href");
                var target = $(href == "#" || href == "" ? 'html' : href);

                if(!target.length) return false;
                var position = target.get(0).offsetTop-headerHeight;
                $('body, html').animate({scrollTop:position}, 650 , 'linear');
                return false;
            });
        },

        scrollAnimation:function(){
            var _scrollObj = {
                _this: this,
                itemObj:null,
                animateFlg:false
            }
            var currentPosition = 0;
            $(".js-scrollAnim").each(function(i){
                var $this = $(this);
                var objectTop;

                objectTop = ($this.offset().top)-( $(window).height()*0.8 );

                var contentsPosition = i;
                var thisAnimateObj = object(_scrollObj);

                thisAnimateObj.itemObj = $this;
                // $(".js-scrollAnim").on('animationend webkitAnimationEnd', function() {
                //     $this.addClass("is-animated");
                // });

                $(window).on('load resize scroll', function(){
                    objectTop = ($this.offset().top) - ( $(window).height()*0.8 );
                    var position = $(window).scrollTop();
                    if(position > objectTop && thisAnimateObj.animateFlg != true){
                        thisAnimateObj.animateFlg = true;
                        thisAnimateObj.itemObj.addClass("is-animate");
                      }

                    var position = $(window).scrollTop();
                    var delay = $this.attr('data-delay') || 1;
                    if(position > objectTop //&& thisAnimateObj.animateFlg != true
                    ){
                        //thisAnimateObj.animateFlg = true;
                        window.setTimeout(function () {
                            thisAnimateObj.itemObj.addClass("is-animate");
                        }, delay);
                    }else{
                        thisAnimateObj.itemObj.removeClass("is-animate is-animated");
                    }
                });


            });
        }


    });


    $(function(){
        //$.navFix();
        $.smoothScroll();
        $.pagetopBtn();
        $.scrollAnimation();

    });
})(jQuery);