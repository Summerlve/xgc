define(["jquery", "underscore", "backbone"], function ($, _, Backbone){
	var testModel = Backbone.Model.extend({
		defaults: {
			name: "<script>alert('xss')</script>"
		}
	});
	
	return {
		testModel: testModel
	}

});