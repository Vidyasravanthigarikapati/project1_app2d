require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/widgets/Legend",
  "esri/widgets/LayerList"
], function(WebMap, MapView, GeoJSONLayer, Legend, LayerList) {

  // --- Load the WebMap from ArcGIS Portal ---
  const chicagoMap = new WebMap({
    portalItem: {
      id: "c1264c52c30e4189b0a806f053a0a6d9" 
    }
  });

  // --- Neighborhoods Layer ---
  const neighborhoodsLayer = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson",
    popupTemplate: {
      title: "Neighborhood Info",
      content: "Community Name: {community}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [50, 205, 50, 0.4], // Slightly different green with transparency
        outline: { color: "darkgreen", width: 2 }
      }
    }
  });

  // --- Rodent Complaints Layer ---
  const rodentReports = new GeoJSONLayer({
    url: "https://data.cityofchicago.org/resource/97t6-zrhs.geojson?$limit=1000",
    popupTemplate: {
      title: "Rodent Complaint Details",
      content: "Request #: {service_request_number}<br>Address: {address}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        color: "tomato", // Slightly different color
        size: 9,
        outline: { color: "darkred", width: 1 }
      }
    }
  });

  // ---Extra geojson Rodent Sightings Layer ---
  const rodentSightings = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson",
    popupTemplate: {
      title: "Rodent Sighting",
      content: "Location: {address}<br>Date Observed: {date}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-marker",
        color: "mediumorchid",
        size: 7,
        outline: { color: "indigo", width: 1 }
      }
    }
  });

  // --- Add layers to the map ---
  chicagoMap.add(neighborhoodsLayer);
  chicagoMap.add(rodentReports);
  chicagoMap.add(rodentSightings);

  // --- Initialize 2D Map View ---
  const view = new MapView({
    container: "viewDiv",
    map: chicagoMap,
    center: [-87.6298, 41.8781], // Chicago center
    zoom: 11
  });

  // --- Add widgets: Legend & Layer List ---
  const legendWidget = new Legend({ view: view });
  const layerListWidget = new LayerList({ view: view });
  view.ui.add(legendWidget, "bottom-left");
  view.ui.add(layerListWidget, "top-right");

});
