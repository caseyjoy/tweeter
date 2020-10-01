$(document).ready(function() {
  $("#tweet-text").on("input propertychange", () => {
    console.log("!")
    const textLength = 140 - $("#tweet-text").val().length;
    $("#counter").val(textLength);
    if(textLength < 0){
      $("#counter").addClass("red");
    }
    else{
      $("#counter").removeClass("red");
    }
  })

  $("#tweet-text").on("focus", function(){
    $(".warning").hide();
  })

});



// was going to use 
// - keyup, but it doesn't update until you release
// - keydown, but it doesn't update on certain deletes
// - change, but it doesn't trigger till you leave