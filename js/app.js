App = Ember.Application.create();


var externalLinksJSON = [{
	id: 1,
	title: "test",
	url: "http://google.com"
}, {
	id: 2,
	title: "test2",
	url: "http://yahoo.com"
}];

/*
$.getJSON('../externalLinks.json', function(data) {
	externalLinksJSON = data;
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