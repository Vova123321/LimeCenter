$(function() {
    $('.main__call_quiz').submit(function(e) {
        var $form = $(this);

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        success: function(data) {
            $('.main__call_quiz')[0].reset();
    		$('.main__call_video > .btn__primary').addClass('btn__disable');
        	$('.main__call_quiz').removeClass('open');
        	$('.main__modal').removeClass('open');
        },
        data: $form.serializeArray()
    }).done(function() {
    	
    }).fail(function() {
        alert('Заполните все поля корректно!');
    });
        e.preventDefault(); 
    });
});

$(document).ready(function() {

	$('.main__call_modal').on('click', function(){
		var modal_index = $(this).data('modal');
		$(`.main__call_quiz[modal="${modal_index}"]`).toggleClass('open')
		.siblings()
		.removeClass('open');
	});

	$('.btn__tel').on('click', function(){
		setTimeout(function(){
      		$('.main__call_video > .btn__primary').removeClass('btn__disable');
   		}, 1500);
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
        	autoplay: true,
  			autoplaySpeed: 2000
      	}
    	}]
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