/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData1GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data1_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	constructor: function(map) {
		var me = this;
		me.callParent();
		Sgis.getApplication().addListener('searchComplte', me.searchComplteHandler, me);
    },
    
    searchComplteHandler:function(results){
    	console.log(results)
    },
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
