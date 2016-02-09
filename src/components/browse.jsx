import React from 'react'
import watchUtils from 'esri/core/watchUtils';
import SearchViewModel from 'esri/widgets/Search/SearchViewModel'
import LocationThumbnail from 'app/components/locationthumbnail'
import { Button, Glyphicon, Grid, Row, Col, Thumbnail, Input} from 'react-bootstrap'
import ReactDOM from 'react-dom'

    // var Button = ReactBootstrap.Button;
let MIN_LENGTH = 2;
const Browse = React.createClass({
  getInitialState(){
    return{
      vm: new SearchViewModel(),
      open: false,
      searchvalue: "",
      resultarray: []
    }
  },
  getDefaultProps(){
    return{
      view: {}
    }
  },

  componentDidMount(){
    this.props.view.then(view =>{
      this.setState({
        view: view
      })
    })
  },

  toggleOpen(){
    this.setState(function(state){
      return {open: !this.state.open}
    })
  },

  searchHandleChange(event){
    if(event.keyCode == 13){
      let searchvalue = this.refs.searchinput.getValue();
      this.state.vm.value = this.refs.searchinput.getValue();//not sure if this is needed, doing it for now
      this.state.vm.maxSuggestions = 3;//temp, not used

      // console.log(searchvalue);
      // if(searchvalue.length > MIN_LENGTH){
        // this.setState({
        //
        // })
        this.state.vm.search(searchvalue).then((resultarray)=>{
          if(resultarray){
            return resultarray[0].slice(0,3)
          }else{
            return [];
          }
        }).then(this.updateResultArray);
        // .then.call(this, function(resultarray){
        //   console.log(resultarray);
        //   this.updateResultArray(resultarray)
        //   // this.setState({
        //   //   searchvalue: this.refs.searchinput.getValue(),
        //   //   resultarray: resultarray
        //   // });
        // })
      //}
      this.setState({
        searchvalue: this.refs.searchinput.getValue()
      });
    }
  },

  searchResultVisibility(){
    if(this.state.searchvalue.length >MIN_LENGTH){
      return 'search-result-show'
    }else{
      return 'search-result-hide'
    }
  },

  updateResultArray(resultarray){
    if(resultarray.length!==0){
      this.setState({
        resultarray: resultarray
      })
    }
  },

  render(){
    if(this.state.open){
      const searchButton = <Button className='search-button'> <Glyphicon glyph="search" /> </Button>;

      return(
        <div className='browse-show'>

         <Input
         type="text"
         value={this.state.value}
         bsSize="large"
         placeholder="Search for a place!"
         className='search-bar'
         ref="searchinput"
         buttonAfter={searchButton}
         onKeyDown={this.searchHandleChange}  />

       <div className={this.searchResultVisibility()}>
         <h3>Explore New Locations:</h3>
         <Grid className="grid-container">
           <Row>
             {[...this.state.resultarray].map((location, i) =>
              //  <LocationThumbnail  key={i + 1} locationName={location.name}  view={this.state.view} />
                <LocationThumbnail  key={i + 1} locationName={location.name}  view={this.state.view} coordinates={[location.feature.geometry.x,location.feature.geometry.y]} />
              )}
           </Row>
         </Grid>
       </div>

            <h1>Curated Locations:</h1>
            <Grid className="grid-container">
              <Row>
                <LocationThumbnail key={101} coordinates={[9.654, 45.919]} locationName="Orobie Bergamasche Park" view={this.state.view}/>
                <LocationThumbnail key={102} coordinates={[-119.58, 37.74894]} locationName="Yosemite National Park Park" view={this.state.view}/>
                <LocationThumbnail key={103} coordinates={[-110.80, 43.74103]} locationName="Grand Teton" view={this.state.view}/>
              </Row>
            </Grid>
        </div>
      );
    }else{
      return (
        <div className='browse-hidden'>
          <Button bsSize="large" onClick={this.toggleOpen} className="left-button"><Glyphicon glyph="search" /></Button>
        </div>
      );
    }
  }
})

export default Browse;
