$(document).ready(function () {
  let mobileNav = "#nav-mobile";
  $(mobileNav).hide();
  // Add ids to each header, so we can use them as anchors
  $("h2,h3")
    .not(".keep-id")
    .each(function () {
      var hyphenated = $(this)
        .text()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/gi, "")
        .replace(/\s/g, "-");
      $(this).attr("id", hyphenated);
    });
  // Show an abstract when you click on a paper
  $(".toggle-abstract").click(function () {
    var id = "#" + $(this).attr("id") + "-abstract";
    $(id).css("display") === "block" ? $(id).hide() : $(id).show();
  });
  // Show mobile nav when box is clicked
  $(".nav-button").click(function () {
    $(mobileNav).css("display") === "none"
      ? $(mobileNav).show()
      : $(mobileNav).hide();
  });
});
