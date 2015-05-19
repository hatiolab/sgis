Ext.define('Sgis.map.SearchLayerAdmin', {
	map:null, 
	toolbar:null,
	gsvc:null,
	selectLayerInfo:{},
	geometry:null,
	sourceGraphicLayer:null,
	targetGraphicLayer:null,
	highlightGraphicLayer:null,
	layer1Url: 'http://cetech.iptime.org:6080/arcgis/rest/services/Layer1_new/MapServer',
	layer2Url: 'http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer',
	area1Arr:[],
	timerId:null,
	spSearchBool:true,
	layers:[],
	layers2:[],
	
	constructor: function(map) {
		var me = this;
		me.map = map;
		me.toolbar = new esri.toolbars.Draw(me.map, {showTooltips:false});
		me.sourceGraphicLayer = new esri.layers.GraphicsLayer();
		me.sourceGraphicLayer.id="sourceGraphic";
		me.map.addLayer(me.sourceGraphicLayer);
		me.targetGraphicLayer = new esri.layers.GraphicsLayer();
		me.targetGraphicLayer.id="targetGraphic";
		
		me.highlightGraphicLayer = new esri.layers.GraphicsLayer();
		me.highlightGraphicLayer.id="highlightGraphic";
		
		Sgis.getApplication().addListener('searchLayerOnOff', me.searchLayerOnOfffHandler, me);
    },
    
    searchLayerOnOfffHandler:function(){
    	var me = this;
    	me.layers = [];
    	me.layers2 = [];
    	Ext.each(selectInfo, function(selectObj, index) {
    		if(selectObj.data.layerId && !isNaN(selectObj.data.layerId)){
    			me.layers.push(selectObj.data.layerId);
    		}
    		if(selectObj.data.layer2Id && !isNaN(selectObj.data.layer2Id)){
    			me.layers2.push(selectObj.data.layer2Id);
    		}
		});
    }
});