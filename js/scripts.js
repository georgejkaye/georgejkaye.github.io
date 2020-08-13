$(document).ready(function () {

	$('h2,h3').not('.keep-id').each(function () {
		var hyphenated = $(this).text().toLowerCase().replace(/[^a-z0-9\s-]/gi, '').replace(/\s/g, '-');
		$(this).attr('id', hyphenated);
	});

});