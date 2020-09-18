/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*
        <article class="tweet">
          <header>
            <div>
              <img src="" class="user-icon">
              <span class="tweet-name">John Smith</span>
            </div>
            <span class="tweet-username">@JohnSmith</span>
          </header>
          <div class="tweet-content">Is the world spinning... or am I?</div>
          <footer>
            <span class="tweeted-how-many-days-ago">10 Days ago</span>
            <span class="tweet-buttons">⚐↻❤</span>
          </footer>
        </article>
*/
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  //console.log("AVATAR: ", $(tweet.user.avatars).text())
  //console.log(+$(tweet.user.avatars).text());
  const createdAt =  escape(tweet.created_at);
  const daysAgo = Math.round((Date.now() - createdAt) / 86400000); 
  console.log("Days ago:",createdAt, daysAgo)
  const printableDaysAgo = `${daysAgo} ${daysAgo == 1 ? "day" : "days"} ago`;

  const newTweet = 
  `<article class="tweet">
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
  </article>`

  return newTweet;
}

function renderTweets(tweets) {
  console.log("Rendering tweets")
  $("#tweets").empty();
  for (let tweet of tweets) {
    console.log(tweet)
    $("#tweets").prepend(createTweetElement(tweet));
  }
}

function loadTweets (){
  $.get("http://localhost:8080/tweets", (data) => {
    console.log("logged tweets:", data);
    renderTweets(data);
  }) 
}

$(document).ready(() => {
  $("form").on("submit", (event) => {
    event.preventDefault();
    const formData = $("form").serialize();
    console.log(formData);

    console.log(formData)

    $.post("/tweets", formData, ()=>{
      loadTweets();
      $("#tweet-text").val("");
    });
   
    
  });

  // renderTweets(tweetData);
  loadTweets();
});