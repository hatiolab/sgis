Ext.define('Sgis.store.Area1Store', {
	
	extend: 'Ext.data.Store',

	fields: ['id', 'name'],

	autoLoad: true,

	remoteSort: true,

	listeners: {
		beforeload: function(store) {
			Ext.defer(function() {
	            store.setData([{
	        		"id" : "1",
	        		"name" : "강원도"
	        	},{
	        		"id" : "2",
	        		"name" : "경기도"
	        	},{
	        		"id" : "3",
	        		"name" : "경상남도"
	        	},{
	        		"id" : "4",
	        		"name" : "경상북도"
	        	},{
	        		"id" : "5",
	        		"name" : "광주광역시"
	        	},{
	        		"id" : "6",
	        		"name" : "대구광역시"
	        	},{
	        		"id" : "7",
	        		"name" : "대전광역시"
	        	},{
	        		"id" : "8",
	        		"name" : "부산광역시"
	        	},{
	        		"id" : "9",
	        		"name" : "세종특별자치시"
	        	},{
	        		"id" : "10",
	        		"name" : "울산광역시"
	        	},{
	        		"id" : "11",
	        		"name" : "인천광역시"
	        	},{
	        		"id" : "12",
	        		"name" : "전라남도"
	        	},{
	        		"id" : "13",
	        		"name" : "전라북도"
	        	},{
	        		"id" : "14",
	        		"name" : "제주특별자치도"
	        	},{
	        		"id" : "15",
	        		"name" : "충청남도"
	        	},{
	        		"id" : "16",
	        		"name" : "충청북도"
	        	}]);
			}, 1, this);
        }
    },
		
	proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});
