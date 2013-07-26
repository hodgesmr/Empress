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
loadContentFile("about.md", function(data) {
	App.set("AboutBody", data);
});

// Post body
App.PostBody = "";
function loadPostBody(filename) {
	loadContentFile(filename, function(data) {
		App.set("PostBody", data);
	});
};

// Asynchronously load markdown files
function loadContentFile(filename, successBlock) {
	$.ajax({
		url: './content/' + filename,
		dataType: 'text',
		success: successBlock,
		error: function(){
			console.error("Error loading " + filename);
		}
	});
};

// Application routes
App.Router.map(function() {
	this.resource('about');
	this.resource('post', {
		path: ':post_filename'
	});
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return params;
	},
	serialize: function(model) {
		return { post_filename: model.filename };
	}
});

// Helpers
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Handlebars.SafeString(new Showdown.converter().makeHtml(input));
});