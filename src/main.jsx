import React from 'react';
import ReactDOM from 'react/react-dom';
import Map from 'esri/Map';
// NOTE - adding the mapvidew as JSX was odd
// Because I need to pass the view around to
// components.
// I'll revisit this later
//import MapView from 'app/components/mapview';
import MapView from 'esri/views/MapView';
import SceneView from 'esri/views/SceneView';
import Browse from 'app/components/browse'



import 'dojo/domReady!';

const map = new Map({ basemap: 'hybrid'});

const view = new SceneView({
  container: document.getElementById('viewDiv'),
  map,
  camera: {
      position: [7.654, 45.919, 2183],
      tilt: 90,
      fov: 120
    },
  ui: {
    components: ["logo", "attribution", "compass"] // empty the UI
  }
});

ReactDOM.render(
  <div>
    <Browse view={view}/>
  </div>,
  document.getElementById('appDiv')
);
