import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
//import { Constants, MapView, Location, Permissions } from 'expo';

import Permissions from 'expo-permissions';
import Location from 'expo-location';
import MapView from "react-native-maps";
import Constants from 'expo-constants';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends Component {

    state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
   
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };


 
  render() {

   
    
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ 
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude,
            
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            
    
            }}
            showsUserLocation={true}
          onRegionChange={this._handleMapRegionChange}
        >
   {/* <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
    />*/}
        </MapView>
      <Text>
          latitude: {this.state.location.coords.latitude} 
      </Text>
      <Text>
          longitude: {this.state.location.coords.longitude}
      </Text>
        
      
      </View>
    );
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
