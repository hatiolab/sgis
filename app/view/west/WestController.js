/**
* West Controller
*/
Ext.define('Sgis.view.west.WestController', {
	
	extend: 'Ext.app.ViewController',
	
	requires: [ 
		'Sgis.view.west.LayerInfoPopupGrid',
		'Sgis.view.west.ScaleInfoPopupGrid'
	],

	alias: 'controller.app-west',

	onClickWestLayer: function() {
		SGIS.popup('Sgis.view.west.LayerInfoPopupGrid');
	},
	
	onClickWestScale: function() {
		SGIS.popup('Sgis.view.west.ScaleInfoPopupGrid');
	}
});
