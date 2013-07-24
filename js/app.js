App = Ember.Application.create();

App.ExternalLinks = [];

App.ExternalLink = Ember.Object.create({
	title: "",
	url: ""
});

$.getJSON('externalLinks.json', function(data) {
	App.set("ExternalLinks",data);
})
.fail(function() { console.error("Error loading externalLinks.json"); });

App.Router.map(function() {
	this.resource('home');
	this.resource('about');
});