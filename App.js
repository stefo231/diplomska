import  React, { Component } from 'react';
import Navigation from './Navigation';
import {Spinner} from './common/Spinner';

import Fire from './Fire';

const googleApiKey = 'AIzaSyCTviEmcPPFnnqGrv3GqfNMmsW7dZ64ulo';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
        address: null,
        country: null,
        locality: null,
        latitude: null, 
        longitude: null,
         
    }
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getLocationDetails(position.coords.latitude,position.coords.longitude) 
             
      },
      (error) => { console.log(error); },
      { enableHighAccuracy: true, timeout: 30000 }
    )
  }

  getLocationDetails(latitude, longitude) {
    //Finding location
    let location = [];
    url='https://maps.googleapis.com/maps/api/geocode/json?address='+ latitude + ',' +longitude + '&key=' +  googleApiKey
    // Where we're fetching data from
    fetch(url)
    // We get the API response and receive data in JSON format...
    .then((response) => response.json())
    // ...then we update the location state
    .then((responseJson) => {
        location = responseJson;
        //////////////
        this.setState({ latitude: latitude, longitude: longitude, loading: true })
        
        


        if (location.results[0].formatted_address != null) {
            formattedAddress = location.results[0].formatted_address;
            this.setState({address: formattedAddress});
        }
        
        //alert(this.state.latitude);
        //console.log(result);
       
       
       //for an array of items.
       location.results[0].address_components.forEach(component => {
        if (component.types.indexOf('country') !== -1) {
          this.setState({ country: component.short_name });   
        }
      });
       location.results[0].address_components.forEach(component => {
          if (component.types.indexOf('locality') !== -1) {
            this.setState({ locality: component.long_name });   
          }
        });
        ///////      
    });
}

renderContent(){
  if(this.state.loading == false){
    return <Spinner size='large' />
    
  }else{
    return <Navigation />
    
  }
}

  render(){
    return(
      this.renderContent()
      //<Navigation />
    );  
  }
}

export default App;
