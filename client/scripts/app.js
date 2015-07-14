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

  var getData = function(){
    return $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        getRooms(data);
        $('.messages').empty();
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


  //getRooms(data)
    //build array of all rooms
    //put those into html
    var getRooms = function(data){
      var rooms = [];
      for (var i = 0; i < data.results.length; i++){
        rooms.push(data.results[i].roomname);
      }
      rooms = _.uniq(rooms);
      rooms.forEach(function(item){
        $('.roomsList').append("<option>" + item + "</option>");
      });

    };






  getData();
  // setInterval(getData, 15000);



  $('.button').on('click', function(e){
    var message = {};
    message.text = $('.userInput').val();
    message.username = window.decodeURIComponent(window.location.search).split('=')[1];
    message.roomname = 'test';

    postMessage(message);
  });

//On page refresh
  //

//Create dropdown field of available rooms
  //selecting a roomname
    //updates roomname property of message


});

