import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


const params = {
    isMapReady: true,
    isMarkerShown: true,
    loadingEnabled: true,
    location: {latitude: 36.800184, longitude: 10.185852},
    markerColor: '#0636d4',
    region: {
      latitude: 36.800184,
      longitude: 10.185852,
      latitudeDelta: 0.010676351271733608,
      longitudeDelta: 0.007999996686777422,
    },
    style: [{borderRadius: 8}, {height:"100%", width: "100%"}],
  };

  
  const Location = () => {
    const [selectedLocation, setSelectedLocation] = React.useState(null);
  
    const handleMapPress = event => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setSelectedLocation({ latitude, longitude });
      console.log({ latitude, longitude })
    };
  
    return (
      <MapView
        initialRegion={params.region}
        loadingEnabled={params.loadingEnabled}
        region={params.region}
        rotateEnabled={params.rotateEnabled}
        scrollEnabled={params.scrollEnabled}
        style={params.style}
        onPress={handleMapPress}
      >
        {Platform.OS !== 'web' && params.isMapReady && params.isMarkerShown && selectedLocation && (
          <Marker coordinate={selectedLocation} centerOffset={{ x: 0, y: -22 }} />
        )}
      </MapView>
    );
  };
  
  export default Location;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  