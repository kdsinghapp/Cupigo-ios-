import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { persistor, store } from '../redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import toastConfig from '../configs/customToast';
import database from '@react-native-firebase/database';


export default function AppNavigator() {
  const [isConnected, setIsConnected] = useState(true);

  // Reference to the root of the database
  const ref = database().ref('/');
  
  // Read data from the root
  ref.once('value')
    .then(snapshot => {
      console.log('Database Data:', snapshot.val());
    })
    .catch(error => {
      console.error('Database Error:', error);
    });
  
  // React.useEffect(() => {
  //   notificationListener();
  //   requestUserPermission();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <RegistrationRoutes />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
