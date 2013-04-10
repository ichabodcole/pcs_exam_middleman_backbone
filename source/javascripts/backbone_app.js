$(function(){
  var Note = Backbone.Model.extend({
    urlRoot: '/notes'
  });

  var NoteList = Backbone.Collection.extend({
    model: Note,
    url: "/notes/index.json",
    initialize: function(){

    }
  });

  var ListItem = Backbone.View.extend({
    tagName: "li",
    initialize: function(options){
      this.model = options.model;
      this.render();
    },

    render: function(){
      this.$el.html(this.model.get('text'));
    }
  });

  var ListView = Backbone.View.extend({
    el: "#notes",
    initialize: function(){
      this.listenTo(Notes, "add", this.addOne);
      this.listenTo(Notes, 'reset', this.addAll);
      Notes.fetch();
    },

    addAll: function(){

    },

    addOne: function(model){
      var note = new ListItem({model:model});
      this.$el.append(note.el);
    },

    render: function(){

    }
  });


  // $('#my-button').onClick(function(e){

  // });

  var Notes = new NoteList();
  var appView = new ListView();
});

