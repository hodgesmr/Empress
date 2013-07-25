App = Ember.Application.create();

App.ExternalLinks = [];
App.ExternalLink = Ember.Object.create();

App.Posts = [];
App.Post = Ember.Object.create();

App.PostBody = Ember.Object.create();

App.AboutBody = "";

$.getJSON('./content/externalLinks.json', function(data) {
	App.set("ExternalLinks", data);
})
.fail(function() { console.error("Error loading externalLinks.json"); });

$.getJSON('./content/posts.json', function(data) {
	App.set("Posts", data);
})
.fail(function() { console.error("Error loading posts.json"); });

$.ajax({
	url: './content/about.md',
	dataType: 'text',
	success: function(data) {
		App.set("AboutBody", data);
	},
	error: function() {
		console.error("Error loading about.md");
	}
});

App.Router.map(function() {
	this.resource('home');
	this.resource('about');
});