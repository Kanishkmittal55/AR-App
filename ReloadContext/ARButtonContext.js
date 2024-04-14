import React, { createContext, useContext, useState } from 'react';

// Create a context for the AR button state
export const ARButtonContext = createContext();

export const useARButton = () => {
  return useContext(ARButtonContext);
};

export const ARButtonProvider = ({ children }) => {
  const [isARButtonActive, setARButtonActive] = useState(true);
  const [isQRCodeScanned, setQRCodeScanned] = useState(false);
  const [isActive, setIsActive] = useState(false); // This will be true or false based on the database snapshot
  const [qrData, setQRData] = useState("null");


  return (
    <ARButtonContext.Provider value={{ isARButtonActive, setARButtonActive, isQRCodeScanned, setQRCodeScanned, isActive, setIsActive, setQRData, qrData}}>
      {children}
    </ARButtonContext.Provider>
  );
};