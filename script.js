require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/widgets/Legend",
  "esri/widgets/LayerList"
], function(WebMap, MapView, GeoJSONLayer, Legend, LayerList) {

  // --- WebMap from Portal ---
  var webmap = new WebMap({
    portalItem: {
      id: "c1264c52c30e4189b0a806f053a0a6d9" 
    }
  });

  // --- Chicago Neighborhoods Layer ---
  var chicagoGeo = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson",
    popupTemplate: { title: "Neighborhood", content: "Community: {community}" },
    renderer: { type: "simple", symbol: { type: "simple-fill", color: [34,139,34,0.5], outline: {color:"darkgreen", width:2} } }
  });

  // --- Chicago Rodent Complaints ---
  var complaintsGeo = new GeoJSONLayer({
    url: "https://data.cityofchicago.org/resource/97t6-zrhs.geojson?$limit=1000",
    popupTemplate: { title: "Rodent Complaint", content: "Service Request: {service_request_number}<br>Address: {address}" },
    renderer: { type: "simple", symbol: { type: "simple-marker", color: "crimson", size: 8, outline: {color: "darkred", width:1} } }
  });

    // --- Chicago Rodent Sightings ---
  var rodentsGeo = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson",
    popupTemplate: { title: "Rodent Sighting", content: "Address: {address}<br>Date: {date}" },
    renderer: { type: "simple", symbol: { type: "simple-marker", color: "darkviolet", size: 8, outline: {color: "indigo", width:1} } }
  });

  // --- Add layers to WebMap ---
  webmap.add(chicagoGeo);
  webmap.add(complaintsGeo);
  webmap.add(rodentsGeo);

  // --- MapView ---
  var view = new MapView({
    container: "viewDiv",
    map: webmap,
    center: [-87.6298, 41.8781], // Chicago center
    zoom: 11
  });

  // --- Widgets ---
  var legend = new Legend({ view: view });
  var layerList = new LayerList({ view: view });
  view.ui.add(legend, "bottom-left");
  view.ui.add(layerList, "top-right");

});
