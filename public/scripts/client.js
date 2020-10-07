/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweet) {
  const createdAt = escape(tweet.created_at);
  const daysAgo = Math.round((Date.now() - createdAt) / 86400000);
  let printableDaysAgo = "";

  if (daysAgo == 0) {
    printableDaysAgo = "Today";
  } else {
    printableDaysAgo = `${daysAgo} ${daysAgo == 1 ? "day" : "days"} ago`;
  }

  const newTweet = `<article class="tweet">
  <header>
    <div>
      <img src="${escape(tweet.user.avatars)}" class="user-icon">
        <span class="tweet-name">${escape(tweet.user.name)}</span>
    </div>
    <span class="tweet-username">${escape(tweet.user.handle)}</span>
  </header>
  <div class="tweet-content">${escape(tweet.content.text)}</div>
  <footer>
    <span class="tweeted-how-many-days-ago">${printableDaysAgo}</span>
    <span class="tweet-buttons">
    <a class="tweet-button">⚑</a>
    <a class="tweet-button">↻</a>
    <a class="tweet-button">❤</a>
    </span>
  </footer>
</article>`;

  return newTweet;
}

function renderTweets(tweets) {
  console.log("Rendering tweets");
  $("#tweets").empty();
  for (let tweet of tweets) {
    $("#tweets").prepend(createTweetElement(tweet));
  }
}

function loadTweets() {
  $.get("http://localhost:8080/tweets", (data) => {
    renderTweets(data);
  });
}

$(document).ready(() => {
  $("#write-new-tweet a").on("click", function (event) {
    event.preventDefault();
    $("#tweet-text").focus();
    $("#tweet-text").selectionStart = 0;
  });

  $("form").on("submit", (event) => {
    event.preventDefault();
    const formData = $("form").serialize();
    const textLength = 140 - $("#tweet-text").val().length;

    console.log("to send:", formData);

    if (textLength > 0 && textLength != 140) {
      $.post("/tweets", formData, () => {
        loadTweets();
        $("#tweet-text").val("");
      });
    }

    $(".warning").on("click", function () {
      $(this).hide();
    });
  });

  loadTweets();
});
