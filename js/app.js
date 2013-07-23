App = Ember.Application.create();

var externalLinksJSON = [{
	id: 0
}];

$.getJSON('externalLinks.json', function(data) {
	externalLinksJSON = data;
	console.log(externalLinksJSON);
})
.fail(function() { console.error("There was an error loading externalLinks.json"); });

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