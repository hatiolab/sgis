Ext.define('Sgis.view.center.Center', {
	
	extend: 'Ext.container.Container',
	
	requires: [
	   	'Sgis.view.center.CenterController',
	   	'Sgis.map.CoreMap'
	],
	
	xtype: 'app-default-center',
	
	controller: 'default-center',
	
	items: [{
			xtype: 'app-map-coreMap',
			width: '100%',
			height: '100%'
		}
	]
	
});