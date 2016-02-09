import React from 'react';
import watchUtils from 'esri/core/watchUtils';
import Slide from "esri/webscene/Slide";
import Camera from "esri/Camera";
import Viewpoint from "esri/Viewpoint";
import Point from "esri/geometry/Point";
import {Button, Glyphicon, Grid, Row, Col, Thumbnail} from 'react-bootstrap';

const LocationThumbnail = React.createClass({
  getInitialState() {
    return {
      coordinates: [
        0, 0
      ],
      locationName: "Atlantic Ocean",
      slide: {
        thumbnail: {
          url: "http://www.rockymountainhikingtrails.com/rocky-mountain-photos/deer-mountain/deer-mountain-thumbnail.jpg"
        },
        title: {
          text: "Atlantic Ocean"
        }
      }
    };
  },

  getDefaultProps() {
    return {
      view: {}
    }
  },

  componentDidMount() {
    this.setState({coordinates: this.props.coordinates, locationName: this.props.locationName})

    this.props.view.then(view => {
      this.setState({view: view});

      let cam = new Camera({position: this.props.coordinates, tilt: 90, fov: 120});
      let vp = new Viewpoint({camera: cam});
      Slide.createFrom(view, {
        basemap: view.map,
        title: {
          'text': this.props.locationName
        },
        viewpoint: vp
      }).then(this.updateSlide);
    });
  },

  componentWillReceiveProps(nextProps) {
    console.log("received");
    this.setState({coordinates: nextProps.coordinates, locationName: nextProps.locationName})
    return true;
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  },
  componentWillUnmount() {
    console.log("unmounted");
  },

  updateSlide(slide) {
    slide.title.text = this.state.locationName
    this.setState({slide: slide});
  },

  getSlideText() {
    // if (this.state.slide) {
      return this.state.slide.title.text
    // } else {return this.locationName}
  },

  jumpToCoordinates() {
    let p = new Point({
      x: this.state.coordinates[0]-0.01,
      y: this.state.coordinates[1]-0.01,
      z: 3000
    })
    let cam = new Camera({position: p, tilt: 90, fov: 120});
    this.state.view.animateTo(cam);
  },

  render() {
    //TODO need to fix the thumbnail.url and thumbnail in general
    return (
      <Col xs={6} md={4} className='location-thumbnail'>


        <Thumbnail src={this.state.slide.thumbnail.url} alt={this.state.locationName} responsive className='thumbnail-picture' onClick={this.jumpToCoordinates}>
          <p>{this.state.locationName}</p>
        </Thumbnail>


      </Col>
    )
  }
});

export default LocationThumbnail;
