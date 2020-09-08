console.log("I'm loaded, Charlie")
//monitorEvents(object [, events]).
$(document).ready(() => {
  $('textarea').on("keyup", function() {
    //console.log(140 - this.value.length);
    $(this).siblings(".counter").text(140 - this.value.length)
    let chars = (140 - this.value.length)
    if (chars < 0){
      $(this).siblings(".counter").addClass("negative")

    } else if (chars >= 0){
      $(this).siblings(".counter").removeClass("negative")
    }
  })
  
});