var locationPath = location.pathname.replace(/\/[^\/]+$/, '');

window.dojoConfig = {
  async: true,
  parseOnLoad: true,
  deps: ['app/main'],
  packages: [{
    name: 'react',
    location: locationPath + '/bower_components/react/',
    main: 'react'
  },{
    name: 'react-dom',
    location: locationPath + '/bower_components/react/',
    main: 'react-dom'
  }, {
    name: 'react-bootstrap',
    location: locationPath + '/bower_components/react-bootstrap',
    main: 'react-bootstrap'
  },{
    name: 'app',
    location: locationPath + '/dist',
    main: 'main'
  }]
};
