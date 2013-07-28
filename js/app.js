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
function loadPostsList() {
	$.ajax({
		url: './content/posts.json',
		dataType: 'json',
		async: false,
		success: function(data) {
			App.set("Posts", data);
		},
		error: function(){
			console.error("Error loading posts.json");
		}
	});
};
loadPostsList();

// About
App.AboutBody = "";
loadContentFile("about.md", function(data) {
	App.set("AboutBody", data);
});

// Current post
CurrentPost = Ember.Object.extend({
	title: null,
	slug: null,
	filename: null,
	publishDate: null
});

function findPostBySlug(slug) {
	loadPostsList();
	for(var i=0; i<App.Posts.length; i++) {
		if(App.Posts[i].slug == slug) {
			var currentPost = CurrentPost.create({
				title: App.Posts[i].title,
				slug: App.Posts[i].slug,
				filename: App.Posts[i].filename,
				publishDate: App.Posts[i].publishDate
			});
			return currentPost;
		}
	}
	return CurrentPost.create({
		title: "Post Not Found"
	});
};

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
		path: ':post_slug'
	});
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return findPostBySlug(params.post_slug);
	},
	serialize: function(model) {
		return {
			post_slug: model.slug
		};
	}
});

// Helpers
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Handlebars.SafeString(new Showdown.converter().makeHtml(input));
});