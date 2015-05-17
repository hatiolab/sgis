Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'Cmm' : 'app/common'
	}
});

Ext.require(['Sgis.CommonModule']);

/**
* The main application class. An instance of this class is created by app.js when it calls
* Ext.application(). This is the ideal place to handle application launch and initialization
* details.
*/
Ext.define('Sgis.Application', {
	extend: 'Ext.app.Application',

	name: 'Sgis',

	stores: [
		'Sgis.store.LayerTreeStore',
		'Sgis.store.Layer2TreeStore',
		'Sgis.store.Area1Store',
		'Sgis.store.Area2Store',
		'Sgis.store.Area3Store',
		'Sgis.store.LayerInfoStore'
	],
	
	views : [
		'Sgis.view.main.Main',
		'Sgis.view.north.North',
		'Sgis.view.west.West',
		'Sgis.view.east.East',
		'Sgis.view.south.South',
		'Sgis.view.center.Center'
	],

	launch: function () {
		var main = Ext.widget('app-main');
		
		main.add({
			region: 'north',
			xtype : 'app-default-north'
		});
		
		main.add({
			region: 'west',
			xtype : 'app-default-west'
		});
		
		/*main.add({
			region: 'east',
			xtype : 'app-default-east'
		});*/
		
		main.add({
			region: 'south',
			xtype : 'app-default-south'
		});
		
		SGIS.show('Sgis.view.center.Center');
	}
});