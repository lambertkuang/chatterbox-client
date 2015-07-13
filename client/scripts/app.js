// YOUR CODE HERE:
$(document).ready(function() {
  var message = {
    // username: 'shawndrost',
    // text: 'trololo',
    // roomname: '4chan'
  };
  var getData = function() {
    var realData;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        realData = data.results;
        console.log('chatterbox: Message sent');
        console.log(realData);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
    return realData;
  };

  $('body').append('<div></div>').data(getData());
});