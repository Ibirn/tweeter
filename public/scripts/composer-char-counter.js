//Function to count available characters in tweet:
/* global document */
/* eslint-env jquery */
$(() => {
  $('textarea').on("keyup", function() {
    $(this).siblings(".counter").text(140 - this.value.length);
    let chars = (140 - this.value.length);
    if (chars < 0) {
      $(this).siblings(".counter").addClass("negative");
    } else if (chars >= 0) {
      $(this).siblings(".counter").removeClass("negative");
    }
  });
});