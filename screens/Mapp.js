import  React, {Component} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import {  MapView } from 'react-native-maps';
import Constants from 'expo-constants';

import { Spinner } from '../common/Spinner';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const googleApiKey = 'AIzaSyCTviEmcPPFnnqGrv3GqfNMmsW7dZ64ulo';
export default class Geolocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
        address: null,
        country: null,
        locality: null,
        latitude: null, 
        longitude: null    
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

renderLocation(){
      if (this.state.loading == false) {
        return <Spinner size='small' />;
    }
    return (
      <View>
        <Text>
          Longitude: {this.state.longitude}
        </Text>
        <Text>
          Latitude {this.state.latitude}
        </Text>
        <Text>
          Location: {this.state.locality}
        </Text>
        <Text>
          Country: {this.state.country}
        </Text>
        <Text>
        Address: {this.state.address}
        </Text>

        <MapView
        style={{  height: 100+'%', width: 100+'%' }}
        showsUserLocation={true}
        mapType={'hybrid'}
        region={{ 
          latitude: this.state.latitude, 
          longitude: this.state.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
                coordinate={{
                  latitude: this.state.latitude, 
                  longitude: this.state.longitude
                }}
                title="My Marker"
                description="Some description"
              />
          </MapView>
        </View>
    );
}


  


  render() {
    return(this.renderLocation())
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  });