/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData6GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data6_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
