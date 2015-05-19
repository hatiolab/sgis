Ext.define('Sgis.map.DynamicLayerAdmin', {
	map:null, 
	layer:null,
	layer2:null,
	constructor: function(map) {
        var me = this;
        me.map = map;
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer("http://cetech.iptime.org:6080/arcgis/rest/services/Layer1_new/MapServer");
		me.layer.id = "DynamicLayer";
		me.map.addLayer(me.layer);
		me.layer.visible = true;
		dojo.connect(me.layer, "onUpdate", function(event){	
			
		});
		dojo.connect(me.layer, "onUpdateStart", function(event){	
			
		});
		dojo.connect(me.layer, "onUpdateEnd", function(event){	
			
		});
		
		me.layer2 = new esri.layers.ArcGISDynamicMapServiceLayer("http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer");
		me.layer2.id = "DynamicLayer2";
		me.map.addLayer(me.layer2);
		me.layer2.visible = true;
		dojo.connect(me.layer2, "onUpdate", function(event){	
			
		});
		dojo.connect(me.layer2, "onUpdateStart", function(event){	
			
		});
		dojo.connect(me.layer2, "onUpdateEnd", function(event){	
			
		});
		
		Sgis.getApplication().addListener('dynamicLayerOnOff', me.dynamicLayerOnOffHandler, me);
    },
    
    dynamicLayerOnOffHandler: function(selectInfo){
    	var me = this;
    	if(selectInfo.length==0){
    		me.layer.setVisibleLayers([]);
    		me.layer2.setVisibleLayers([]);
    		return;
    	}
    	var layers = [];
    	var layers2 = [];
    	Ext.each(selectInfo, function(selectObj, index) {
    		if(selectObj.data.layerId && !isNaN(selectObj.data.layerId)){
    			layers.push(selectObj.data.layerId);
    		}
    		if(selectObj.data.layer2Id && !isNaN(selectObj.data.layer2Id)){
    			layers2.push(selectObj.data.layer2Id);
    		}
			if(index==selectInfo.length-1){
				me.layer.setVisibleLayers(layers);
				me.layer2.setVisibleLayers(layers2);
			}
		});
    }
});