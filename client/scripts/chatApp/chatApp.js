var ChatModel = Backbone.Model.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  initialize: function(username, text, roomname) {
    this.set('username', username);
    this.set('text', text);
    this.set('roomname', roomname);
  },
  defaults: {
    username: 'anon',
    text: '',
    roomname: 'All'
  }
});

var ChatView = Backbone.View.extend({
  template: _.template('<div class="chat" data-id="<%= objectId %>"> \
                        <div class="user"><%= username %></div> \
                        <div class="text"><%= text %></div> \
                        </div>'),
  // initialize: function() {
  //   this.model.on('change', this.render, this);
  // },
  render: function() {
    return this.template(this.model.attributes);
    // var html = [
    //   '<div class="main">',
    //   '</div>'
    // ].join('');

    // this.$el.html(html);
    // this.$el.find('#chats').append(this.model.map(function(chat) {
    //   return ['<div class="chat">', '<span class="username">', chat.get('username'), ': ', chat.get('text'), '</span>']
    // }));
  }
});

var ChatsView = Backbone.View.extend({
  initialize: function() {
    this.collection.on('sync', this.render, this);
  },
  render: function() {
    this.collection.forEach(this.renderMessage, this);
  },
  renderMessage: function() {
    var chatView = new ChatView({model: text});
  }
});

var ChatCollection = Backbone.Collection.extend({
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response, options) {
    return response.results;
  },
  model: ChatModel,
  view: ChatView
});


var testCol = new ChatCollection();
testCol.fetch({
  data: {
    order: '-createdAt'
  },
  success: function(model) {
    console.log(model);
    // model.models[0].attributes.results.forEach(function(item) {
    //   console.log(item);
    // });
    console.log("Successfully fetched data");

  },
  error: function() {
    console.log("Could not get data");
  }
});