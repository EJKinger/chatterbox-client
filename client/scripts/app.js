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


var getMessages = function(){
  return $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: 'GET',
    contentType: 'application/json',
    success: function(data) {
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

getMessages();
setInterval(getMessages, 3000);