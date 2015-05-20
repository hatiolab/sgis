/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData7GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data7_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
