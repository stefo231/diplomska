import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
//import { Constants, MapView, Location, Permissions } from 'expo';
import Permissions from 'expo-permissions';
import Location from 'expo-location';
import MapView from 'expo';
import Constants from 'expo-constants';


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class App extends Component{



    render(){
        return(
            <MapView
            style={{  height: 100+'%', width: 100+'%' }}
            
            mapType={'hybrid'}
            region={{ 
              latitude: 41.749846, 
              longitude: 22.200577,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              <MapView.Marker
                    coordinate={{
                      latitude: 41.749846, 
                      longitude: 22.200577
                    }}
                    title="My Marker"
                    description="Some description"
                  />
              </MapView>
        );  
      }

}
    


export default App;
    