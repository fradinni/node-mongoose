var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home"
	},

	initialize: function() {
		this.firstPage = true;
	},

	home: function() {
		var users = new UserCollection();
		var self = this;
		users.fetch({
			success: function() {
				self.changePage(new HomeView({model: users.models[0]}));
			}
		});		
	},

	changePage: function (page) {
		if(!this.firstPage) {
			$('#page-content').fadeOut(100);
		}
        page.render();
        $('#page-content').append($(page.el));
        $('#page-content').fadeIn(100);
    }
});

$(document).ready(function() {	

	var app = new AppRouter();
	Backbone.history.start();
	
});