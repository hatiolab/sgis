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
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
