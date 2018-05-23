import React, { Component } from 'react';
import './App.css';
import Navigation from './components/TopNav/TopNav';
import MapContainer from './components/Map';
import NashData from './components/NashData';
import Geolocation from './components/Geolocation';
import BottomNav from './components/BottomNav';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      DataIsLoaded: false,
      searchName: "N/A",
      geoLocated:false,
      currentLat:null,
      currentLon:null
    }
    this.searchName = this.searchName.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount(){
      var component = this

      fetch("https://data.nashville.gov/resource/terb-nbm6.json")
      .then((resp) => resp.json())
      .then(function(data) {
          component.setState({
              data: data,
              DataIsLoaded: true,
              searchName: "N/A"
          })
      }
      )
  }

  getLocation(coords){
    console.log("coords are here",coords)
    this.setState({
      geoLocated:true,
      latitude: coords.latitude,
      longitude:coords.longitude
    })
  }

  searchName(name){
    this.setState({
      searchName: name
    })
  }

  render() {
    console.log("this is the state now",this.state);
    return (
      <div>
        <Navigation search={this.searchName}/>
        <MapContainer data={this.state.data} />
        <Geolocation getLocation={this.getLocation} />
        <NashData search={this.state.searchName} data={this.state.data} loaded={this.state.DataIsLoaded} currentLat={this.state.latitude} currentLon={this.state.longitude} geolocated={this.state.geoLocated}/>

        <BottomNav />
      </div>
    )
  }
}

export default App;
