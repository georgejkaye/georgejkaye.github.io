$(document).ready(function () {

	$("a[href^=\\#]").click(function(e) {
		e.preventDefault();
		var aid = $(this).attr("href");
		var offset = aid === "#top" ? 0 : $(aid).offset().top
		$('html,body').animate({scrollTop: offset},'slow');
	});

	$('h2,h3').not('.keep-id').each(function () {
		var hyphenated = $(this).text().toLowerCase().replace(/[^a-z0-9\s-]/gi, '').replace(/\s/g, '-');
		$(this).attr('id', hyphenated);
	});

	$('.publication').click(function () {
		
		var id = "#" + $(this).attr('id') + "-abstract"
		console.log(id)
		$(id).css("display") === "block" ? $(id).slideUp() : $(id).slideDown()
	})

	$('a').click(function(e) {
		console.log("aa")
		e.stopPropagation();
	})

});