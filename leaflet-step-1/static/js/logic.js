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
      fillOpacity: .8,
      radius: 30000 * earthquake.properties.mag
    }).bindPopup(`<h3>${earthquake.properties.place}<h3><h3>Magnitude: ${earthquake.properties.mag}<h3><h3>Depth: ${earthquake.geometry.coordinates[2]}<h3>`);;
    earthquakeMarkers.push(earthquakeMarker);
  };

  mapCreate(L.layerGroup(earthquakeMarkers));
  

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

  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var nightMode = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/navigation-night-v1",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street": street,
    "Night Mode": nightMode,
    "Satellite": satellite
  };

  var overLayMaps = {
    "Earthquakes": earthquakeMarkers
  };

  var myMap = L.map("map", {
    center: [14.5994, -28.6731],
    zoom: 3.2,
    layers: [street]
  });

  L.control.layers(baseMaps, overLayMaps, {
    collapsed: false
  }).addTo(myMap);

  // map legend
  var legend = L.control({ 
    position: "bottomright" 
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var bins = ["< 10", "10 - 29", "30 - 49", "50 - 69", "70 - 90", "> 90"]
    var colors = ["#1a9850", "#d9ef8b", "#fed976", "#fd8d3c", "#f03b20", "#bd0026"];
    var labels = [];   
    

    labels.push(`<p style=background-color:lightgrey>Depth of Quake</p>`);
    for (var i = 0; i<bins.length; i++) {
      labels.push(`<ul style=background-color:${colors[i]}>${bins[i]}</ul>`);
    };
    
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
    return div;
  };

  legend.addTo(myMap);

}

function getFillColor(depth) {
  if (depth < 10) {
    color = "#1a9850";
  } else if (depth >=10 & depth < 30) {
    color = "#d9ef8b";
  } else if (depth >=30 & depth < 50) {
    color = "#fed976";
  } else if (depth >=50 & depth < 70) {
    color = "#fd8d3c";
  } else if (depth >=70 & depth < 90) {
    color = "#f03b20";
  } else {
    color = "#bd0026";
  }

  return color
};


  