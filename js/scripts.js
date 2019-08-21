$(document).ready(function(){

	$(function(e){
		if(document.location.pathname == '/') {
			var hash = window.location.hash.substr(1);
			console.log(hash);
			$('#' + hash + '-link').addClass('active');
		}
	});

	$('h2,h3').not('.keep-id').each(function(){
		var hyphenated = $(this).text().toLowerCase().replace(/[^a-z0-9\s-]/gi, '').replace(/\s/g, '-');
		$(this).attr('id', hyphenated);
	});

	/*$(".home-item").on('click', function (e) {
		console.log("work");
		$(".active").removeClass('active');
		$(this).addClass('active');
	}); */

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
		});
		
		if(document.location.pathname == '/') {
			$('.active').removeClass('active');
			console.log("target");
			$(target + '-link').addClass('active');
		}
	});
    
});
