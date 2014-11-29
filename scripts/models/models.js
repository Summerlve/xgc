define(["jquery", "underscore", "backbone"], function ($, _, Backbone){
	//表的一行	
	var tableRow = Backbone.Model.extend({
			
	});
	
	//表
	var tableCollection = Backbone.Collection.extend({	
		initialize: function (){		
		},
		model: tableRow
	});
	
	return {
		tableRow: tableRow,
		tableCollection: tableCollection,
	}
});