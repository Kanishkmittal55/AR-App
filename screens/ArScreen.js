import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroVideo,
  ViroNode,
  ViroText,
  Viro3DObject,
  ViroMaterials
} from '@viro-community/react-viro';
import { useARButton } from '../ReloadContext/ARButtonContext';
import axios from 'axios';
import TouchID from 'react-native-touch-id';


const InitialScene = () => {
  const navigation = useNavigation();
  const { isActive, setIsActive, qrData } = useARButton();
  const [currentUserName, setCurrentUserName] = useState("")
  const [age, setAge] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ip, setIp] = useState('10.25.6.65');
  const [email, setEmail] = useState("");
  const [ab, setAB] = useState("");
  const [employer, setEmployer] = useState("");
  const [learnMoreVideoOpacity, setLearnMoreVideoOpacity] = useState(1);
  const [learnMoreVideoPaused, setLearnMoreVideoPaused] = useState(true);
  const [crossOpacity, setCrossOpacity ] = useState(0);

  const fetchUserDataFromDb = async (data) => {
    try {
      const response = await axios.get(`http://${ip}:3000/users?qrCodeId=${data}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        console.log("The name you need is ", response.data[0].name)
        setCurrentUserName(response.data[0].name);
        setIsActive(user.isActive);
        setAge(response.data[0].age);
        setEmail(response.data[0].email);
        setEmployer(response.data[0].EmployerName);
        setAB(response.data[0].AvailableBalance);
        // You can also set other user details to the state/context here
      }
    } catch (error) {
      console.log(`I amm causing the error ${error}`)
      alert('Error fetching user data');
    }
  };

  const handleTouchIDAuthentication = () => {
    TouchID.authenticate('Please authenticate to proceed', {})
      .then(success => {
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.log('Authentication Failed:', error);
        alert('Authentication failed. Please try again.');
      });
  };


  useEffect(() => {
    // This will run when the component mounts
    console.log("InitialScene mounted");

    fetchUserDataFromDb(qrData);

    return () => {
      // This will run when the component unmounts

      console.log("InitialScene unmounted");
    };
  }, []);



  ViroMaterials.createMaterials({
    startTv: {
      diffuseTexture: require('../assets/start.png')
    },
    stopTv: {
      diffuseTexture: require('../assets/stop.png')
    },
    skull: {
      diffuseTexture: require('../assets/skull/Skull.jpg')
    },
    exit: {
      diffuseTexture: require('../assets/exit.jpg')
    },
    signUp: {
      diffuseTexture: require('../assets/signUp3.png')
    },
    profilePic: {
      diffuseTexture: require('../assets/johnDoe.jpg')
    },
    welcome: {
      diffuseTexture: require('../assets/welcome.png')
    },
    cross:{
      diffuseTexture: require('../assets/cross.png')
    }
  })


  const [videoPaused, setVideoPaused] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [position, setPosition] = useState([-1.5, -2, 2])


  const handleSignup = () => {
    setVideoPaused(true);
    setVideoOpacity(0);
    console.log("SignUp Initialized");
    navigation.navigate('signUp');

  };

  const handlePausePlay = () => {
    setVideoPaused(!videoPaused);

  };

  const handlevido2PausePlay = () => {
    setLearnMoreVideoPaused(!learnMoreVideoPaused)
  }

  const handleExitPress = () => {
    setLearnMoreVideoOpacity(0);
    setLearnMoreVideoPaused(true);
    setCrossOpacity(0);
    navigation.navigate('Home');
  }



  // Register Target
  ViroARTrackingTargets.createTargets({
    cardImage: {
      source: require('../assets/dailypay/card.png'),
      physicalWidth: 0.165
    }
  });

  const handlelearnMore = () => {
    setLearnMoreVideoOpacity(0);
    setLearnMoreVideoPaused(true);
  }

  const handleWelcomeClick = () =>{
    setCrossOpacity(1);
    setLearnMoreVideoOpacity(1);
    setLearnMoreVideoPaused(false);
  }



  return (

    <ViroARScene>
      <ViroARImageMarker
        target='cardImage'
      >
        <ViroAmbientLight color="#ffffff" />
        <ViroNode position={[-0.05, 0, -0.25]} rotation={[-170, 0, 0]} scale={[0.05, 0.05, 0.05]}>
          {isActive ? (
            
            <>
             <Viro3DObject
                source={require('../assets/tv/tv4.obj')}
                position={[-1.5, -1, 8.5]}
                scale={[0.15, 0, 1.5]}
                rotation={[0, -90, 0]}
                type='OBJ'
                materials={["welcome"]}
                onClick={handleWelcomeClick}
              />
              <Viro3DObject
                source={require('../assets/tv/tv4.obj')}
                position={[2, -1, 22.5]}
                scale={[0.20, 0, 0.4]}
                rotation={[0, -90, 0]}
                type='OBJ'
                materials={["cross"]}
                onClick={handlelearnMore}
                opacity={crossOpacity}
              />

              <ViroVideo
                source={require('../assets/Post-Reg-Video.mp4')}
                loop={true}
                paused={learnMoreVideoPaused}
                position={[-4.5, -1, 15]}
                scale={[15, 9, 0]}
                rotation={[90, 0, 0]}
                opacity={learnMoreVideoOpacity}
                onClick={handlevido2PausePlay}
              />

             <Viro3DObject
                source={require('../assets/tv/tv4.obj')}
                position={[0, -1, 4]}
                scale={[0.7, 0, 1]}
                rotation={[0, -90, 0]}
                type='OBJ'
                materials={["profilePic"]}
              />
              <Viro3DObject
                source={require('../assets/tv/tv4.obj')}
                position={[0, -1, -9.5]}
                scale={[0.2, 0, 0.7]}
                rotation={[0, -90, 0]}
                type='OBJ'
                materials={["exit"]}
                onClick={handleExitPress}
              />
              <ViroText
                text={currentUserName}
                scale={[4, 4, 4]}
                position={[5.5, -1, 5]}  // Adjust this position to make the text appear on the 3D object
                style={{...styles.textStyle, color: 'white'}} 
                extrusionDepth={0.5}
                rotation={[90, 0, 0]}
                

              />
              <ViroText
                text={age}
                scale={[4, 4, 4]}
                position={[5.5, -1, 3.75]}  // Adjust this position to make the text appear on the 3D object
                style={styles.textStyle}
                extrusionDepth={0.5}
                rotation={[90, 0, 0]}

              />
              <ViroText
                text={email}
                scale={[4, 4, 4]}
                position={[5.5, -1, 2.5]}  // Adjust this position to make the text appear on the 3D object
                style={styles.textStyle}
                extrusionDepth={0.5}
                rotation={[90, 0, 0]}
              />
              <ViroText
                text={ab}
                scale={[4, 4, 4]}
                position={[5.5, -1, 1.25]}  // Adjust this position to make the text appear on the 3D object
                style={styles.textStyle}
                extrusionDepth={0.5}
                rotation={[90, 0, 0]}
              />
              <ViroText
                text={employer}
                scale={[4, 4, 4]}
                position={[5.5, -1, ]}  // Adjust this position to make the text appear on the 3D object
                style={styles.textStyle}
                extrusionDepth={0.5}
                rotation={[90, 0, 0]}
              />
              
              
            </>

          ) : (
            <>
              <ViroVideo
                source={require('../assets/video.mp4')}
                loop={true}
                paused={videoPaused}
                position={position}
                scale={[10, 6, 0]}
                rotation={[90, 0, 0]}
                opacity={videoOpacity}
                onClick={handlePausePlay}
              />

              


              <Viro3DObject
                source={require('../assets/tv/tv4.obj')}
                position={[0, -1, -10]}
                scale={[0.15, 0, 1]}
                rotation={[0, -90, 0]}
                type='OBJ'
                materials={["signUp"]}
                onClick={handleSignup}
              />
            </>
          )}
        </ViroNode>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const ARScreen = () => {
  const { isQRCodeScanned, qrData } = useARButton();
  const navigation = useNavigation();

  const navigateToLandingPage = () => {
    // navigation.navigate('Home')
    navigation.navigate('Home')
  }


  return (
    <View style={{ flex: 1 }}>
      {isQRCodeScanned ? (
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: InitialScene
          }}
        />
      ) : (
        <>
          <View style={styles.mainView}>
            <Text>Error in Scanning QR Code</Text>
            <Button
              title="Go Back and Try to Reload the App"
              onPress={navigateToLandingPage}
            />
          </View>
        </>
      )}
    </View>
  );
};



export default ARScreen;


const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
    backgroundColor: '#ff0000' // Red background for the button
  },
  mainView: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

