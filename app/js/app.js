/**********************************************/

$(function() {
  	$('.main__quiz').submit(function(e) {
    	e.preventDefault();
    	var formData = new FormData(this);

    	if (!$('.main__quiz_checked input[type="checkbox"][name="privacy"]').is(':checked')) {
    		alert("Согласитесь с условиями перед подписью на них.");
    		e.preventDefault();
  		}

    	fetch(this.action, {
      		method: this.method,
      		body: formData
    	})

      	.then(response => response.json())
      	.then(data => {
        	$('#quiz2 .main__quiz_btn').toggleClass('btn__disable');
          	$('#quiz1').toggleClass('active');
          	$('#quiz6').removeClass('active');
          	$('.main__quiz')[0].reset();
      	})
      	.catch(error => {
        	if (error.status === 400) {
        		$('.quiz__error_name').toggleClass('active');
        	} else if (error.status === 409) {
          		$('.quiz__error_phone').toggleClass('active');
        	} else if (error.status === 500) {
          		$('.quiz__error_server').toggleClass('active');
        	} else if (error.status === 401) {
          		$('.quiz__error_email').toggleClass('active');
        	} else {
          		$('.quiz__error_server').toggleClass('active');
        	}

        	$('.main__quiz')[0].reset();
      	});
  	});
});

/**********************************************/

$(function() {
  	$('.main__call_quiz').submit(function(e) {
    	e.preventDefault();
    	var formData = new FormData(this);

    	fetch(this.action, {
      		method: this.method,
      		body: formData
    	})
      	.then(response => response.json())
      	.then(data => {
        	$('.main__call_quiz')[0].reset();
    		$('.main__call_video > .btn__primary').addClass('btn__disable');
        	$('.main__call_quiz').removeClass('open');
        	$('.main__modal').removeClass('open');
        	$('body').removeClass('root');
      })

      .catch(error => {
        	if (error.status === 400) {
        		$('.call__error_name').toggleClass('active');
        	} else if (error.status === 409) {
          		$('.call__error_phone').toggleClass('active');
        	} else if (error.status === 500) {
          		$('.call__error_server').toggleClass('active'); $(this).removeClass('active');
        	} else if (error.status === 401) {
          		$('.call__error_email').toggleClass('active');
        	} else {
          		$('.call__error_server').toggleClass('active');
        	}
      	});
  	});
});

/**********************************************/
$(document).ready(function() {

	/**********************************************/
	$('.main__quiz_radio').on('click', function(e) {
  		$('[name="experience"]').on('click', function() {
  			if ($(this).is(':checked')) {
    			$(".main__quiz_btn[data-num='2']").removeClass('btn__disable');
  			}
		});

		$('[name="worktype"]').on('click', function() {
  			if ($(this).is(':checked')) {
    			$(".main__quiz_btn[data-num='4']").removeClass('btn__disable');
  			}
		});

		$('[name="yourage"]').on('click', function() {
  			if ($(this).is(':checked')) {
    			$(".main__quiz_btn[data-num='5']").removeClass('btn__disable');
  			}
		});

		$('[name="equipment"]').on('click', function() {
  			if ($(this).is(':checked')) {
    			$(".main__quiz_btn[data-num='6']").removeClass('btn__disable');
  			}
		});
	});
	/**********************************************/

	$('#quiz1 .main__quiz_btn').on('click', function(){
		setTimeout(function(){
      		$('#quiz2 .main__quiz_btn').removeClass('btn__disable');
   		}, 15000);
	});

	$('.main__quiz_btn').click(function(event) {
		event.preventDefault();
		$('.main__quiz_box').removeClass('active')
			var num = $(this).attr('data-num');
		$('#quiz'+num).addClass('active')
			if ($('#quiz'+num).hasClass('active')) {
				$(this).removeClass('active');
		}	;
	});
	/**********************************************/

	$('.main__call_modal').on('click', function(){
		var modal_index = $(this).data('modal');
		$(`.main__call_quiz[modal="${modal_index}"]`).toggleClass('open')
		.siblings()
		.removeClass('open');
	});

	$('.btn__tel').on('click', function(){
		setTimeout(function(){
      		$('.main__call_video > .btn__primary').removeClass('btn__disable');
   		}, 15000);
	});

	$('.btn__modal_close').on('click', function(){
		$('.main__call_video > .btn__primary').addClass('btn__disable');
	});

	$('.btn__modal').on('click', function(){
		var modal_index = $(this).data('modal');
		$('body').toggleClass('root');
		$(`.main__modal[modal="${modal_index}"]`).toggleClass('open')
		.siblings()
		.removeClass('open');
	});

	$('.btn__modal_close').on('click', function(){
		$('body').removeClass('root');
		$('.main__modal, .main__call_quiz').removeClass('open');
	});
	/**********************************************/

	$('.header__nav_btn').click(function(){
		$(this).toggleClass('open');
	});

	$('.header__nav_btn').click(function(e) {
		$('.header__nav_mobile').toggleClass('open'),
		$('body').toggleClass('root');
	});

	$('.header__nav_close').click(function() {
		$('.header__nav_mobile').removeClass('open'),
		$('.header__nav_btn').removeClass('open'),
		$('body').removeClass('root')
	});

	$('.header__nav_mobile ul > li > a').click(function() {
		$('.header__nav_mobile').removeClass('open'),
		$('.header__nav_btn').removeClass('open'),
		$('body').removeClass('root')
	});

	$(".header__top a, .pros__charge .btn__primary").click(function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, {
			duration: 1000,
			easing: "swing"
		});
		return false;
	});
	/**********************************************/

	$('.review__slider').slick({
		dots: true,
  		infinite: true,
		arrows: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: false,
  		autoplaySpeed: 2000,
  		responsive: [{
      	breakpoint: 1024,
      	settings: {
        	slidesToShow: 1,
        	slidesToScroll: 1,
        	infinite: true,
        	dots: false,
        	autoplay: false,
  			autoplaySpeed: 2000
      	}
    	}]
	});

	/**********************************************/
	var button = $('.scrolltop');	
	$(window).scroll (function () {
		if ($(this).scrollTop () != 0) {
			button.fadeIn();
		} else {
			button.fadeOut();
		}
	});	 
	button.on('click', function(){
		$('body, html').animate({
			scrollTop: 0
		}, 1500);
		return false;
	});

});