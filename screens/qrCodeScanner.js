import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useARButton } from '../ReloadContext/ARButtonContext';

const QRCodeScannerScreen = ({onScan}) => {
  const { isQRCodeScanned, setQRCodeScanned, setIsActive, setQRData } = useARButton();


  const navigation = useNavigation();
  const handleQRCodeRead = (e) => {
    console.log(`QR Code content: ${e.data}`);
    setQRData(e.data)
    setQRCodeScanned(true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'arScreen' }],
  });
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleQRCodeRead}
        cameraStyle={styles.cameraContainer}  // This style for the camera
        topContent={null} // Removes top content
        bottomContent={null} // Removes bottom content
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cameraContainer: {  // Add this style
    height: '100%',
    width: '100%',
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
});

export default QRCodeScannerScreen;
