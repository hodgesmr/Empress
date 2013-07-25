App = Ember.Application.create();

// External Links
App.ExternalLinks = [];
App.ExternalLink = Ember.Object.create();
$.getJSON('./content/externalLinks.json', function(data) {
	App.set("ExternalLinks", data);
})
.fail(function() { console.error("Error loading externalLinks.json"); });

// List of posts
App.Posts = [];
App.Post = Ember.Object.create();
$.getJSON('./content/posts.json', function(data) {
	App.set("Posts", data);
})
.fail(function() { console.error("Error loading posts.json"); });

// About
App.AboutBody = "";
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

// Post body
App.PostBody = "";

// Application routes
App.Router.map(function() {
	this.resource('home');
	this.resource('about');
});

// Helpers
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Handlebars.SafeString(new Showdown.converter().makeHtml(input));
});