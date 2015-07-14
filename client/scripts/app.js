// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox
// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });

$(document).ready(function(){

  var getMessages = function(){
    return $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        $('.messages').empty();
        console.log('Request Made!!');
        for (var i = 0; i < data.results.length; i++) {
          $('.messages').append("<div class='message'>" + _.escape(data.results[i].text) + "</div>");
        }
      },

      error: function(data) {
        console.log(data);
      }
    });
  };

  var postMessage = function(message) {
    $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log(data);
      }
    });
  };

  getMessages();
  // setInterval(getMessages, 15000);

  // SELECT USER NAME AND SEND MESSAGE


  $('.button').on('click', function(e){
    var message = {};
    message.text = $('.userInput').val();
    message.username = window.decodeURIComponent(window.location.search).split('=')[1];
    message.roomname = 'test';

    postMessage(message);
  });

});

// need a data (form) field, with a submit button

// put request in a function to invoke later (ie click)
  // function will:
  // get user name
  // get text
  // get room name (?)
  // format above data, make POST request
  // console.log code

