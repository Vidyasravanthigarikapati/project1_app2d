require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/GeoJSONLayer",
  "esri/widgets/Legend",
  "esri/widgets/LayerList"
], function(WebMap, MapView, GeoJSONLayer, Legend, LayerList) {

  // --- Map ---
  const chicagoMap = new WebMap({
    portalItem: { id: "c1264c52c30e4189b0a806f053a0a6d9" }
  });

  // --- Layers ---
  const neighborhoodsLayer = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/chicago.geojson",
    popupTemplate: { title: "Neighborhood Info", content: "Community Name: {community}" }
  });

  const rodentReports = new GeoJSONLayer({
    url: "https://data.cityofchicago.org/resource/97t6-zrhs.geojson?$limit=1000",
    popupTemplate: { title: "Rodent Complaint Details", content: "Request #: {service_request_number}<br>Address: {address}" }
  });

  const rodentSightings = new GeoJSONLayer({
    url: "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%201/Assignment%201/data/rodents.geojson",
    popupTemplate: { title: "Rodent Sighting", content: "Location: {address}<br>Date Observed: {date}" }
  });

  chicagoMap.addMany([neighborhoodsLayer, rodentReports, rodentSightings]);

  // --- View ---
  const view = new MapView({
    container: "viewDiv",
    map: chicagoMap,
    center: [-87.6298, 41.8781], // Chicago
    zoom: 11
  });

  // --- Widgets ---
  const legendWidget = new Legend({ view: view, container: "legendDiv" });
  const layerListWidget = new LayerList({ view: view, container: "layerListDiv" });

});

// --- Toggle function ---
function toggleWidget(id) {
  document.getElementById("legendDiv").style.display = "none";
  document.getElementById("layerListDiv").style.display = "none";
  const panel = document.getElementById(id);
  panel.style.display = (panel.style.display === "block") ? "none" : "block";
}
