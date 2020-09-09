// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

/* global document */
/* eslint-env jquery */
$(() => {

  //Turns individual tweets into HTML with values escaped.
  const createTweetElement = (tweetobject) => {
    const escape = str => {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
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
          <button type="submit" class="btn">F</button>
          <button type="submit" class="btn">RT</button>
          <button type="submit" class="btn">L</button>
        </span>
      </footer>
    </article>
  `)
  };

  //Takes an array of tweet objects and renders them all via createTweetElement().
  const renderTweets = tweetarray => {
    const $feed = $('.feed');
    $feed.empty();
    for (const elem of tweetarray) {
      console.log('elem:', elem)
      $feed.prepend(createTweetElement(elem));
    }
  }

  //AJAX POST request to dynamically update the page.
  const $tweetText = $("#tweet-form")
  $tweetText.on('submit', function (event) {
    event.preventDefault()
    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData) //returns promise.
      .then((response) => {
        $('#tweet-text').val('');
        $(".counter").val(140);
        loadTweets();
      });
  });

  //AJAX GET request to show tweets.
  const loadTweets = () => {
    //console.log('ham')
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      console.log('Success: ', data);
      renderTweets(data)
    })
  }

  loadTweets()
})
