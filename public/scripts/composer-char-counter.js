$(document).ready(function () {
  $("#tweet-text").on("input propertychange", () => {
    const textLength = 140 - $("#tweet-text").val().length;

    $("#new-tweet button").prop(
      "disabled",
      textLength > 0 && textLength != 140 ? false : true
    );

    $("#counter").val(textLength);
    textLength < 0
      ? $("#counter").addClass("red")
      : $("#counter").removeClass("red");
  });

  $("#tweet-text").on("focus", function () {
    $(".warning").hide();
  });
});

// was going to use
// - keyup, but it doesn't update until you release
// - keydown, but it doesn't update on certain deletes
// - change, but it doesn't trigger till you leave
