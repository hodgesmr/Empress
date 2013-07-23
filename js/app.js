App = Ember.Application.create();

var externalLinksJSON = [{
	id: 0
}];

$.getJSON('externalLinks.json', function(data) {
	externalLinksJSON = data;
	console.log(externalLinksJSON);
})
.fail(function() { console.error("There was an error loading externalLinks.json"); });

// The above successfully updates the externalLinksJSON variable
// but Ember has already rendered the page with the original JSON data
// Below will do everything synchronously, but that's gross...

/*
$.ajax({
	url:'externalLinks.json',
	async: false,
	dataType: 'json',
	success: function(data) {
		externalLinksJSON = data;
	},
	error: function() {
		console.log.error("Error loading externalLinks.json")
	}
});
*/

App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
	this.resource('home');
	this.resource('about');
});

App.HomeRoute = Ember.Route.extend({
	model: function() {
		return App.ExternalLink.find();
	}
});

App.ExternalLink = DS.Model.extend({
	title: DS.attr('string'),
	url: DS.attr('string')
});

App.ExternalLink.FIXTURES = externalLinksJSON;