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
      this.$el.html("");
    },

    addOne: function(model){
      console.log("s");
      var note = new ListItem({model:model});
      this.$el.append(note.el);
    }
  });

  $('#my-button').click(function(e){
    $('#notes').slideUp(200, function(){
      console.log("Collection Length: " + Notes.length);
      Notes.reset();
      console.log("Collection Length: " + Notes.length);
      fetchAndShow();
    });
  });

  function fetchAndShow(){
    var timeout = setTimeout(function(){
      Notes.fetch({success: function(){
        $('#notes').slideDown(1000);
      }});
    }, 200);
  }

  var Notes = new NoteList();
  var appView = new ListView();
});

