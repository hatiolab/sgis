/**
* West Tab2 Controller
*/
Ext.define('Sgis.view.west.WestTab2Controller', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.default-west-tab2',
	
	control: {
		'#cmbArea1': {
			change: 'onArea1Change'
		},
		'#cmbArea2': {
			change: 'onArea2Change'
		},
		'#cmbArea3': {
			change: 'onArea3Change'
		}
	},
	
	onArea1Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},
	
	onArea2Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},
	
	onArea3Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},

	onAreaCircleClick: function() {
		SGIS.msg.alert('원형 Clicked!');
	},
	
	onAreaRectClick: function() {
		SGIS.msg.alert('사각형 Clicked!');
	},
	
	onAreaPolygonClick: function() {
		SGIS.msg.alert('다각형 Clicked!');
	},
	
	onAreaRadiusClick: function() {
		SGIS.msg.alert('반경 Clicked!');
	},
	
	onAreaDeselectClick: function() {
		SGIS.msg.alert('선택해제 Clicked!');
	}
});