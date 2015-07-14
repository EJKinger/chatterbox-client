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
  var friends = [];

  var getData = function(roomName){
    return $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        getRooms(data);
        $('.messages').empty();
        for (var i = 0; i < data.results.length; i++) {
          if (roomName !== undefined && roomName !== 'Select All'){
            if (data.results[i].roomname === roomName){
              //add username line
              $('.messages').append("<div class='message'>" +
                                      "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                      "<p class='" + _.escape(data.results[i].username) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                                    "</div>");
            }
          }
          //if it gets the roomname from the on change room dropdown funciton
            //only display messages from that room
          //else display all messages
          else {
            $('.messages').append("<div class='message'>" +
                                      "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                      "<p class='" + _.escape(data.results[i].username) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                                  "</div>");
            //$('.messages').append("<div class='message'>" + _.escape(data.results[i].text) + "</div>");
          }
        }
        afterPageLoads();
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
        //clear message and room input fields
        $('.userInput').val('');
        $('.newRoomName').val('');
        getData(message.roomname);
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
    //if user is in chat room, refresh room and not all messages


    var afterPageLoads = function() {
      for (var i = 0; i < friends.length; i++){
        $("." + friends[i]).css('font-weight', 'bold');
      }
    };



    //   friends.forEach(funciton(item){
    //     $(item).css('font-weight', 'bold'));
    //   };
    // };



  $('.button').on('click', function(e){
    var message = {};
    message.text = $('.userInput').val();
    message.username = window.decodeURIComponent(window.location.search).split('=')[1];
    if ($('.newRoomName').val() === ''){
      //if user selected room from dropdown, use it
      message.roomname = $('.roomsList option:selected').text();
    } else {
      message.roomname = $('.newRoomName').val();
    }

    postMessage(message);
  });

  // SELECT FIELD LISTENER
  $('.roomsList').on('change', function(e){
    var room = $('.roomsList option:selected').text();
    if (room === 'New Room') {
      $('.newRoom').toggle();
    } else {
      $('.newRoom').css({display: 'none'});
    }

    // RENDER MESSAGES FROM SELECTED ROOM
    getData(room);
  });

  $('body').on('click', '.userNameLink', function(e){
    console.log(this.innerText);
    //console.log(this.val());
    friends.push(this.innerText);
    console.log(friends);
    afterPageLoads();
  });


//On page refresh
  //

//Create dropdown field of available rooms
  //selecting a roomname
    //updates roomname property of message


});

