import React , {useState, useLayoutEffect}from 'react';
import { Text, StyleSheet, Button, View, TextInput,Image, TouchableOpacity, Linking } from "react-native";
import { useARButton } from '../ReloadContext/ARButtonContext';
import axios from 'axios';
import Video from 'react-native-video';
import CustomButton from './components/CustomButton';


const SignUp = ({navigation}) => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [ip, setIP] = useState('10.25.6.65');
  const [isVideoPaused, setIsVideoPaused] = useState(false);

    const handlePress = () => {
      Linking.openURL('https://dailypay.com');
    };
  
  const { qrData } = useARButton();

  // Mock Async Api function to handle the database
  const handleRegister = async () => {
    try {
      
      const userResponse = await axios.get(`http://${ip}:3000/users?qrCodeId=${qrData}`);
      console.log(`User has been found with qrCodeId ${userResponse.data[0].qrCodeId}`)
      if (userResponse.data.length > 0) {
        const userId = userResponse.data[0].id;
        const QrCodeIdd = userResponse.data[0].qrCodeId
        console.log(`User has been found ${userId}`)
        // Now, update the user's details using a PUT request
        const updateResponse = await axios.put(`http://${ip}:3000/users/${userId}`, {
          id: userId,
          qrCodeId:QrCodeIdd,
          name: name,
          age: age,
          email: email,
          facebookAccount: facebook,
          youtubeChannel: youtube,
          isActive: true,
          AvailableBalance: "£100",
          EmployerName: "McDonalds"
        });
      if (updateResponse.status === 200) {
        alert('Registration successful!');
        navigation.navigate('Home');
      }
    } else {
      alert('User not found.');
    }
    setIsVideoPaused(true);
  }catch (error) {
      console.log(`I am causing the error 2 ${error}`)
      alert('Error registering user.');
    }
  };

  const navigateToLandingPage = () => {
    // navigation.navigate('landingPage')
    setIsVideoPaused(true)
    navigation.navigate('Home')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <Button 
                title="Home >" 
                onPress={navigateToLandingPage} 
                color="black"
            />
        )
    });
  }, [navigation]);

    return (
     
        <View style={styles.mainView}>
         {/* <Video
          source={require('../assets/Post-Reg-Video.mp4')}   // Adjust the path to point to your video
          style={[StyleSheet.absoluteFill, {
            top: 420,
            transform: [{ scale: 1.0 }] 
          
          }]}  // This will make the video cover the whole screen
          resizeMode="cover"  // This ensures the video covers the screen and is clipped if necessary
          repeat  // This will make the video loop indefinitely
          paused={isVideoPaused}
        /> */}

        <Image 
            source={require('../assets/signUp.png')} // Adjust the path to point to your logo
            style={{ width: 200, height: 100 }}
            resizeMode="contain" // This ensures the logo fits within the dimensions you provide
        />
        <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Date Of Birth"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {/* <TextInput
        placeholder="Facebook Account URL"
        value={facebook}
        onChangeText={setFacebook}
        style={styles.input}
      />
      <TextInput
        placeholder="YouTube Channel URL"
        value={youtube}
        onChangeText={setYoutube}
        style={[styles.input, { marginBottom: 30 }]}

      /> */}
      
      <View style={styles.registerButtonContainer}>
        <CustomButton title="Register" onPress={handleRegister} color={"white"}/>
        
        </View>


        <Image 
            source={require('../assets/logo.jpg')} // Adjust the path to point to your logo
            style={{ width: 200, height: 100 }}
            resizeMode="contain" // This ensures the logo fits within the dimensions you provide
        />

<TouchableOpacity onPress={handlePress}>
      <Text style={{color: 'white'}}>
          dailypay.com
      </Text>
    </TouchableOpacity>

        </View>


    )
}

const styles = StyleSheet.create({
    mainView:{
      
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#ff4c01',
      paddingBottom: 200
    },
    textStyle:{
      color:'blue',
    },
    myText:{
      marginBottom:20,
      fontSize:20,
      color:'white',
      fontWeight: 'bold'
    },
    input: {
      width: '80%',
      height: 50,
      borderColor: 'black',  // Changed to black
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor:'white',
      borderRadius: 10        // Add this line to curve the edges
    },
    registerButtonContainer: {
      
      backgroundColor: 'white',  // Light green color
      borderRadius: 15,               // Curved edges
      overflow: 'hidden',            // Ensures the button doesn't exceed the boundaries of the container
      width: 150,
      height:40,                    // Width of the container, adjust as needed
      marginBottom: 40 ,
      marginTop: 20 
                                // Space at the bottom, adjust as needed
    }
  })


export default SignUp