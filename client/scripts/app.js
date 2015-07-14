$(document).ready(function(){
  // GLOBAL VARIABLE TO PERSIST FRIENDS
  var friends = [];

  /*
    DATABASE INTERACTION FUNCTIONS
  */
  var getData = function(roomName){
    return $.ajax({
      url: "https://api.parse.com/1/classes/chatterbox",
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        getRooms(data);
        insertMessages(data, roomName);
        boldFriendsMessages();
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
        alert('ERROR: Message Not Sent');
      }
    });
  };


  /*
    HELPERS
  */
  // WRITE DATA TO THE DOM
  var insertMessages = function(data, roomName) {
    // CLEAR MESSAGE AREA
    $('.messages').empty();
    for (var i = 0; i < data.results.length; i++) {
      // IF A ROOM IS SELECTED, WRITE TO THAT ROOM
      if (roomName !== undefined && roomName !== 'Select All'){
        if (data.results[i].roomname === roomName){
          $('.messages').append("<div class='message'>" +
                                  "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                  "<p class='" + _.escape(data.results[i].username) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                                "</div>");
        }
      }
      // IF ROOM WAS NOT CHOSEN, SHOW ALL MESSAGES
      else {
        $('.messages').append("<div class='message'>" +
                                  "<p><a class='userNameLink' href='#'>" + _.escape(data.results[i].username) + "</a></p>" +
                                  "<p class='" + _.escape(data.results[i].username) + "'>" + _.escape(data.results[i].text) +     "</p>" +
                              "</div>");
      }
    }
  };

  // ADDS ROOMS TO DROP-DOWN LIST
  var getRooms = function(data){
    var rooms = [];
    for (var i = 0; i < data.results.length; i++){
      rooms.push(_.escape(data.results[i].roomname));
    }
    rooms = _.uniq(rooms);
    rooms.forEach(function(item){
      $('.roomsList').append("<option>" + item + "</option>");
    });
  };

  // DISPLAYS FRIENDS' MESSAGES IN BOLD
  var boldFriendsMessages = function() {
    for (var i = 0; i < friends.length; i++){
      $("." + friends[i]).css('font-weight', 'bold');
    }
  };


  /*
    EVENT LISTENERS
  */
  // LISTENS FOR SUBMIT BUTTON CLICK
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

  // LISTENS FOR CHANGE IN DROP-DOWN MENU (ROOMS)
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

  // ADDS TO FRIENDS ARRAY, BOLDENS FRIENDS' MESSAGES
  $('body').on('click', '.userNameLink', function(e){
    friends.push(this.innerText);
    boldFriendsMessages();
  });


  // START RENDERING TO PAGE
  getData();
});

