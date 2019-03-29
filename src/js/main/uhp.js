var uhp = {};

uhp.init = function() {
	var _ = this;

	_.$win = $(window);
	_.$html = $('html');

	_.nav();

	_.$win.on('load', function(){
		_.infograph();
		_.toTop();
		_.slider();
	});
};

uhp.nav = function() {
	var _ = this,
		menuOpen = false,
		minScrollTop = 20;

	function onScroll() {
		if ( _.$win.scrollTop() >= minScrollTop ) {
			_.$html.addClass('has-fixed-header');
		}
		else {
			_.$html.removeClass('has-fixed-header');
		}
	}

	function openMenu() {
		menuOpen = true;
		_.$html.addClass('menu-open');
	}
	function closeMenu() {
		menuOpen = false;
		_.$html.removeClass('menu-open');
	}

	_.$win.on('resize', function(){
		onScroll();
		closeMenu();
	});

	_.$win.on('scroll.nav load', function(){
		onScroll();
	});

	$('#js-menu-btn').on('click', function(e){
		e.preventDefault();

		if(menuOpen) {
			closeMenu();
		}
		else {
			openMenu();
		}
	});
};

uhp.slider = function() {
	var $slider = $('#js-slider');

	$slider.slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 400,
		slidesToShow: 1,
		swipeToSlide: true,
		touchThreshold: 10,
		autoplay: true,
		pauseOnHover: true,
		autoplaySpeed: 3000,
		centerMode: true,
		variableWidth: true
	});
};

uhp.infograph = function() {

	var _ = this,
		$c = $('#js-infograph'),
		cPos = $c.position(),
		speed = [2700, 2000, 2500, 3000];

	_.$win.on('scroll.infograph', function(){
		if ( (_.$win.scrollTop() + _.$win.height()) > cPos.top ){
			
			// unbind scroll
			_.$win.off('scroll.infograph');

			$c.find('.js-infograph-percent').each(function(i){
				var $this = $(this),
					fullNum = parseInt($this.text()),
					intervalObj = null,
					intervalTime = Math.ceil( speed[i] / fullNum ),
					currNum = 0;

				$this.text('0');
				intervalObj = setInterval(countUp, intervalTime);

				function countUp() {
					$this.text(currNum++);

					if (currNum == fullNum) {
						clearInterval(intervalObj);
					}
				}
			});

		}
	});
};

uhp.toTop = function() {
	$('.js-to-top').on('click', function(e){
		e.preventDefault();
		$('html,body').animate({ scrollTop: 0 }, 200);
	});
};

////////////////////
// DOCUMENT READY //
////////////////////
$(function(){
	uhp.init();
});