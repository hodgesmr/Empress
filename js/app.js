App = Ember.Application.create();

App.ExternalLinks = [];
App.ExternalLink = Ember.Object.create();

App.Posts = [];
App.Post = Ember.Object.create();

App.PostBody = Ember.Object.create();

$.getJSON('./content/externalLinks.json', function(data) {
	App.set("ExternalLinks",data);
})
.fail(function() { console.error("Error loading externalLinks.json"); });

App.Router.map(function() {
	this.resource('home');
	this.resource('about');
});