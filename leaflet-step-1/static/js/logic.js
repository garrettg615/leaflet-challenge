url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(data) {
  console.log(data.features);
  
  var locations = data.features
  var earthquakeMarkers = [];
  // var coord = [];

  for (var i = 0; i<locations.length; i++) {
    var earthquake = locations[i];
    // coord.push([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]])
    var earthquakeMarker = L.circle([earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]],{
      color: getFillColor(earthquake.geometry.coordinates[2]),
      fillColor: getFillColor(earthquake.geometry.coordinates[2]),
      fillOpacity: .5,
      radius: 5000 * earthquake.properties.mag
    }).bindPopup(`<h3>${earthquake.properties.place}<h3><h3>Magnitude: ${earthquake.properties.mag}<h3><h3>Depth: ${earthquake.geometry.coordinates[2]}<h3>`);;
    earthquakeMarkers.push(earthquakeMarker);
  };

  mapCreate(L.layerGroup(earthquakeMarkers))
  

});

function mapCreate(earthquakeMarkers) {

  // Adding tile layer
  var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street": street
  };

  var overLayMaps = {
    "Earthquakes": earthquakeMarkers
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

function getFillColor(depth) {
  if (depth < 1) {
    color = "green";
  } else if (depth >=1 & depth < 2) {
    color = "yellow";
  } else {
    color = "red";
  }

  return color
}