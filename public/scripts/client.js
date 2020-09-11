// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

/* global document */
/* eslint-env jquery */

$(() => {

  //Escape function to prevent malicious XSS
  const escape = str => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Turns individual tweets into HTML with values escaped.
  const createTweetElement = (tweetobject) => {
    return $(`
    <article class="tweet">
      <header>
        <img src="${tweetobject.user.avatars}">
        <div>
          <span class="name">${escape(tweetobject.user.name)}</span>
          <span class="handle hide">${escape(tweetobject.user.handle)}</span>
        </div>
      </header>
      <p class="content">${escape(tweetobject.content.text)}</p>
      <hr>
      <footer>
        ${moment(tweetobject.created_at).fromNow()} 
        <span>
          <button type="submit" class="btn"><i class="fas fa-flag"></i></button>
          <button type="submit" class="btn"><i class="fas fa-retweet"></i></button>
          <button type="submit" class="btn"><i class="fas fa-heart"></i></button>
        </span>
      </footer>
    </article>
  `);
  };

  //Takes an array of tweet objects and renders them all via createTweetElement().
  const renderTweets = tweetarray => {
    const $feed = $('.feed');
    $feed.empty();
    for (const elem of tweetarray) {
      //console.log('elem:', elem);
      $feed.prepend(createTweetElement(elem));
    }
  };

  //AJAX POST request to dynamically update the page.
  const $tweetText = $("#tweet-form");
  $tweetText.on('submit', function (event) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0 || $("#tweet-text").val() === null) {
      $(".charLimit").slideUp();
      return $(".empty").slideDown()
    } else if ($("#tweet-text").val().length > 140) {
      $(".empty").slideUp();
      return $(".charLimit").slideDown();
    }
    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData) //returns promise.
      .then(() => {
        $(".charLimit").slideUp();
        $(".empty").slideUp();
        $('#tweet-text').val('');
        $(".counter").val(140);
        loadTweets();
      });
  });

  //AJAX GET request to show tweets.
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        //console.log('Success: ', data);
        renderTweets(data);
      });
  };

  //Animation of nav link to show/hide compose and auto-focus.
  $("body > nav > p").click(function () {
    $(".new-tweet").slideToggle("slow", function () {
      if ($("#tweet-text").is(":visible")) {
        $('html, body').animate({
          scrollTop: $("#tweet-text").offset().top - 200
        }, 1000);
        $("#tweet-text").focus();
      }
    });
  });

  loadTweets();
});
