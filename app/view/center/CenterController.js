/**
* West Controller
*/
Ext.define('Sgis.view.center.CenterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.default-center',
	
	control: {
		'app-default-center': {
			resize: 'resizeHandler'
		}
	},
	
	resizeHandler:function(obj, width, height, oldWidth, oldHeight, eOpts){
		this.getView().child('app-map-coreMap').mapReisze();
	}
});
