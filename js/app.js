/* This is a basic concept, but under the hood needs a lot of work.
 *
 * Lists that can be generated with {{#each}} should be.
 * Content should be stored in a database and retreived when needed.
 * Adding projects and essays should be easy from a managing standpoint.
 * I should have a login to get to my stuff
 * The vim/ folder shouldn't be hidden, maybe.
 * Routing should be cleaned up.
 * Each project should have its own page with a gallery or two.
 * Templates should go in their own folder, not just one big file.
 */

App = Ember.Application.create({});

App.Router.map(function() {
	this.route("about");
	this.route("projects");
	this.route("essays");
	this.route("links");
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    controller.set('menu', ['Home', 'About', 'Projects', 'Essays', 'Links']);
  }
});