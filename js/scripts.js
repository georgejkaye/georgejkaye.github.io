$(document).ready(function(){

	$('h2,h3').each(function(){
		var hyphenated = $(this).text().toLowerCase().replace(/\s/g, '-');
		$(this).attr('id', hyphenated);
	});

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

    $('.thumb').hover(function() {
        $(this).attr('src', $(this).attr('src').slice(0, -4) + '-1.jpg');
    }, function() {
        $(this).attr('src', $(this).attr('src').slice(0, -6) + '.jpg');
    });
    
});
