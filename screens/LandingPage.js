import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text, StyleSheet, Button, View, DevSettings, Image, TouchableOpacity} from "react-native";
import { useARButton } from '../ReloadContext/ARButtonContext'; // Adjust the path as needed
import Video from 'react-native-video';


const LandingPage = ({navigation}) => {
  const {isARButtonActive, setARButtonActive, setArButtonPressed} = useARButton();
  
  const navigateToARScreen = () => {
    setARButtonActive(false);
    // Reset the navigation stack and navigate to the arScreen
    navigation.reset({
        index: 0,
        routes: [{ name: 'qrScanner' }],
    });
}

useLayoutEffect(() => {
  navigation.setOptions({
      headerRight: () => (
          <Button 
              title="Reload" 
              onPress={reloadApp} 
              color="black"
          />
      )
  });
}, [navigation]);

const reloadApp = () => {
  DevSettings.reload();
  
  
}

    return (
        <View style={styles.mainView}>
          {/* <Video
          source={require('../assets/Home-Screen-Video.mp4')}   // Adjust the path to point to your video
          style={[StyleSheet.absoluteFill, {
            top: 270,
            transform: [{ scale: 1.0 }] 
          
          }]}  // This will make the video cover the whole screen
          resizeMode="cover"  // This ensures the video covers the screen and is clipped if necessary
          repeat  // This will make the video loop indefinitely
        /> */}

        <Image 
            source={require('../assets/logo.jpg')} // Adjust the path to point to your logo
            style={{ width: 300, height: 150 }}
            resizeMode="contain" // This ensures the logo fits within the dimensions you provide
        />

        {/* Custom AR Button */}
      <TouchableOpacity style={styles.arButton} onPress={navigateToARScreen} disabled={!isARButtonActive}>
        <Text style={styles.arText}>AR</Text>
      </TouchableOpacity>

        {!isARButtonActive  && <Text>Please reload the app to access AR again.</Text>}
        {/* <Button 
          title="Reload App"
          onPress={reloadApp}
          color="white"
          
        /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#ff4c01',
      paddingBottom:400
      
    },
    textStyle:{
      color:'white',
    },
    arButton: {
      position: 'absolute', // Position the button absolutely 
      bottom: 20,           // 10 pixels from the bottom
      right: 20,            // 10 pixels from the right
      backgroundColor: 'white',
      width: 60,            // Set your desired width for the circle
      height: 60,           // Set your desired height for the circle
      borderRadius: 30,     // Half of width/height to make it a perfect circle
      justifyContent: 'center',
      alignItems: 'center',
    },
    arText: {
      color: '#ff4c01',
      fontSize: 20,
      fontWeight: 'bold',
    }
    

  })


export default LandingPage