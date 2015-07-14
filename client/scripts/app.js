var app = {};
app.init = function() {

};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      function escapeHtml(unsafe) {
        if (unsafe) {
          return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }
      }
      var rooms = [];
      _.each(data.results, function(item) {
        var username = escapeHtml(item.username);
        var message = escapeHtml(item.text);
        var cleanRoom = escapeHtml(item.roomname);
        rooms.push(cleanRoom);
        $('#chats').append('<div>' + username + ':' + message + '</div>');
      });
      var roomnames = _.uniq(rooms);
      _.each(roomnames, function(room) {
        if (room) {
          $('#roomSelect').append('<option value=' + room + '>' + room + '</option>');
        }
      });

      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

app.clearMessages = function() {
  $('#chats').remove();
};

app.addMessage = function(message) {
  $('#chats').append('<div>' + message + '</div>');
  this.send(message);
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function() {

};

app.handleSubmit = function() {

};

$(document).ready(function() {
  app.fetch();
  var getURL = function() {
    var url = window.location.search.substring(1);
    var vars = url.split('=');
    return vars[1];
  };
  $('form').on('submit', function(event) {
    var text = $('#message').val();
    var user = getURL($('#message'));
    var message = {
      username: user,
      text: text,
      roomname: '2'
    };
    app.send(message);
    event.preventDefault();
  });

});

