/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData5GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data5_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
