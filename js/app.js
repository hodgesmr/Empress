App = Ember.Application.create();

var externalLinksJSON = [{
	id: 0
}];

$.getJSON('externalLinks.json', function(data) {
	externalLinksJSON = data;
	console.log(externalLinksJSON);
})
.done(function() { console.log("second success"); })
.fail(function() { console.log("error"); })
.always(function() { console.log("complete"); });


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