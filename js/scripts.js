$(document).ready(function () {

	var home = false;
	var url = "";

	if (document.location.pathname == '/') {
		home = true;
		url = window.location.hash;
	} else {
		url = "#" + window.location.pathname.slice(1, -1);
	}

	updateSidebarLinks(home, url);

	$('h2,h3').not('.keep-id').each(function () {
		var hyphenated = $(this).text().toLowerCase().replace(/[^a-z0-9\s-]/gi, '').replace(/\s/g, '-');
		$(this).attr('id', hyphenated);
	});

	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});

		if (document.location.pathname == '/') {
			home = true;
			url = target;
		} else {
			url = "#" + window.location.pathname.slice(1, -1);
		}

		updateSidebarLinks(home, url);
	});

});

function updateSidebarLinks(home, target) {

	if (home) {
		$('.active').removeClass('active');

		if (target === "") {
			target = '#top'
		}
	}

	$(target + '-link').addClass('active');

}