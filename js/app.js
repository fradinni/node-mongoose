var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home"
	},

	initialize: function() {
		this.firstPage = true;
	},

	home: function() {
		this.changePage(new HomeView());
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