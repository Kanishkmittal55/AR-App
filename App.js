import React from 'react';
import { Text, StyleSheet, Button, View} from "react-native";
import LandingPage from './screens/LandingPage';
import ArScreen from './screens/ArScreen';
import SignUp from './screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ARButtonProvider } from './ReloadContext/ARButtonContext';
import QRCodeScannerScreen from './screens/qrCodeScanner';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <ARButtonProvider>
      <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: '#ff4c01' },  // Header background color
        headerTintColor: '#ff4c01',                   // Color for header title and buttons
        headerTitleStyle: { fontWeight: 'bold' },
        headerShadowVisible:false
      }}
      >
        <Stack.Screen name="Home" component={LandingPage} />
        <Stack.Screen name="signUp" component={SignUp} />
        {/* <Stack.Screen name="arScreen" component={ArScreen} /> */}
        <Stack.Screen 
        name="arScreen" 
        component={ArScreen} 
        options={{ 
          headerShown: false,          // This hides the header entirely
        }}
      />
        {/* <Stack.Screen name="qrScanner" component={QRCodeScannerScreen} /> */}
        <Stack.Screen 
        name="qrScanner" 
        component={QRCodeScannerScreen} 
        options={{ 
          headerShown: false,          // This hides the header entirely
        }}
      />
      </Stack.Navigator>
      </NavigationContainer>
    </ARButtonProvider>
  )
}



export default App;