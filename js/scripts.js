$(document).ready(function(){

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

    $('#theorem-pic').hover(function() {
        $(this).attr('src', '/images/projects/theorem-prover-thumb-1.jpg');
    }, function() {
        $(this).attr('src', '/images/projects/theorem-prover-thumb.jpg')
    });

    $('#ballin-pic').hover(function() {
        $(this).attr('src', '/images/projects/ballin-thumb-1.jpg');
    }, function() {
        $(this).attr('src', '/images/projects/ballin-thumb.jpg')
    });

});
