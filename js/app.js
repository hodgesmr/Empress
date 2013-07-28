App = Ember.Application.create();

App.Title = "Empress";

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

// Current post
CurrentPost = Ember.Object.extend({
	title: "",
	slug: "",
	filename: "",
	publishDate: ""
});

function findPostBySlug(slug) {
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

App.IndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		$('.nav-collapse').collapse('hide');
		document.title = App.Title;
	}
});

// About Controller
App.AboutController = Ember.ObjectController.extend({
	aboutBody: ""
});

// About Route
App.AboutRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		$('.nav-collapse').collapse('hide');
		loadContentFile("about.md", function(data) {
			controller.set("aboutBody", data);
		});
		document.title  = "About";
	}
});

// Post Controller
App.PostController = Ember.ObjectController.extend({
	title: "",
	slug: "",
	filename: "",
	publishDate: "",
	postBody: ""
});

// Post Route
App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return findPostBySlug(params.post_slug);
	},
	serialize: function(model) {
		return {
			post_slug: model.slug
		};
	},
	setupController: function(controller, model) {
		controller.set("postBody", ""); // do this to get rid of text flash while loading
		controller.set("title", model.title);
		controller.set("slug", model.slug);
		controller.set("filename", model.filename);
		controller.set("publishDate", model.publishDate);
		if(model.filename != null && model.filename != "") {
			loadContentFile('posts/'+model.filename, function(data) {
				controller.set("postBody", data);
			});
		}
		if(model.title != null && model.title != "") {
			document.title = model.title;
		}
	}
});

// Markdown helper
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Handlebars.SafeString(new Showdown.converter().makeHtml(input));
});

// Date helper
Ember.Handlebars.registerBoundHelper('date', function(date) {
	if(date != null && date != "") {
  		return moment(date).format('MMMM Do YYYY');
  	}
});