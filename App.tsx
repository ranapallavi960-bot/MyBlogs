import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from './src/screens/Splash';
import { setIsSplash } from './src/store/slices/blogSlice';
import LoginSignUpScreen from './src/screens/LoginOrSignUp';
import { NavigationContainer } from '@react-navigation/native'
import { Stack } from './src/navigation/navigation.config';
import LoginScreen from './src/screens/Login';
import SignUpScreen from './src/screens/SignUp';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import messaging from '@react-native-firebase/messaging';
import TitleDescriptionCard from './src/Components/TitleDescriptionComponent';
import TitleDescription from './src/screens/TitleDescription';

console.log("Logs are working!")

function App() {
const state = useSelector((state: any) => state.blogs)
  const dispatch = useDispatch()

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  // const getToken = async () => {
  //   const token = await messaging().getToken()
  //   console.log("Token = ", token)
  // }

  


  useEffect(() => {
    const myTimeout = setTimeout(() => {
      dispatch(setIsSplash(false));
      // requestUserPermission()
      // getToken()
      console.log("This is timeout function")
    }, 2000);

    return () => {
      clearTimeout(myTimeout);
    }
  }, [])

  if (state.isSplash) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen
          name="LoginOrSignUp"
          component={LoginSignUpScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen} />
        <Stack.Screen          
          name="BottomTabs"
          component={BottomTabNavigation} />
           <Stack.Screen          
          name="TitleDescription"
          component={TitleDescription} />

      </Stack.Navigator>
    </NavigationContainer>
  );



}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
 
})