var map, layer1, layer2wfs, layer3, layerBase1, layerBase2;
var controlZoomin,controlPan,controlSelect;

function creationCarte(){
	
		controlZoomin = new ol.interaction.DragZoom();
		controlPan = new ol.interaction.DragPan();
		controlSelect = new ol.interaction.Select();
		controlSelect.setActive(false);
		layer1 = new ol.layer.Tile({source: new ol.source.TileWMS({
                url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/charlotte/mapfile/Projet.map&',
                params: {LAYERS: 'Interpolation', VERSION: '1.1.1'}
            })
        });
		
		layer2wfs = new ol.layer.Tile({source: new ol.source.TileWMS({
                url: 'http://igeomedia.com/cgi-bin/mapserv?map=/home/charlotte/mapfile/Projet.map&',
                params: {LAYERS: 'Export_Output', VERSION: '1.1.1'}
            })
        });
		layer2wfs.setVisible(false);

		
		layer3 = new ol.layer.Vector({
           	source: new ol.source.Vector({
			    url:"http://igeomedia.com/cgi-bin/mapserv?map=/home/charlotte/mapfile/Projet.map&service=wfs&version=1.1.0&request=getfeature&typename=milieuxhumides&srsName=EPSG:3857",
                format: new ol.format.WFS({
		})
      		}), 
		style : new ol.style.Style({
        		fill: new ol.style.Fill({
          		color: [255,0,0,1]
        		}),
        		stroke: new ol.style.Stroke({
          		color: [0,0,0,1],
          		width: 3
        		})
             })
	 });
		
		layer3.setVisible(false);


		layerBase1 = new ol.layer.Tile({source: new ol.source.OSM()});
		
		layerBase2 = new ol.layer.Tile({
			source: new ol.source.BingMaps({
		  	key: 'AiZ32E8HurfkTvU_eL2JJfYOeUpZF5tkzCOPHzpB_8sf7Pi6_luZhSjPWvnKdjup',
		  	imagerySet: 'Aerial'
			})
		});
		

		layerBase1.setVisible(true);
		layerBase2.setVisible(false);
		
		
		map = new ol.Map({
          
        target: 'map', 
        
        view: new ol.View({
          projection: 'EPSG:3857',
          center: ol.proj.transform([-72.17,45.10],'EPSG:4326','EPSG:3857'),
          zoom: 14
        }),
        
        layers: [layerBase1, layerBase2, layer1, layer2wfs, layer3],


        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine(),
            new ol.control.MousePosition({
				coordinateFormat: ol.coordinate.createStringXY(4),
				projection: 'EPSG:4326'
			}),
            new ol.control.FullScreen()
          ]),
		  
		interactions: ol.interaction.defaults({
			dragPan: false,
			dragZoom: false
		}).extend([
			controlZoomin,controlPan, controlSelect
		]), 
          
      });
	  
	controlSelect.on('select', function(evt){
		var selected = evt.selected;

		selected.forEach(function(features){
            $("#infoPanel").text(features.getProperties().nom +" dans la municipalité : " + features.getProperties().municipali);
        });
    
    });



}
