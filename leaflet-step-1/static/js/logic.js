url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(data) {
  console.log(data.features);
  
  var locations = data.features
  var earthquakeMarkers = [];
  // var coord = [];

  for (var i = 0; i<locations.length; i++) {
    var earthquake = locations[i];
    // coord.push([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]])
    var earthquakeMarker = L.marker([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]]).bindPopup("Heading");
    earthquakeMarkers.push(earthquakeMarker);
  };

  mapCreate(L.layerGroup(earthquakeMarkers))

});

function mapCreate(markers) {

  // Adding tile layer
  var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  var baseMaps = {
    "Street": street
  };

  var overLayMaps = {
    "Earthquakes": markers
  };

  var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [street]
  });

  L.control.layers(baseMaps, overLayMaps, {
    collapsed: false
  }).addTo(myMap);



}