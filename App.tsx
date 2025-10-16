import React, { useState, useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from './src/screens/Splash';
import { setIsLogin, setIsSplash } from './src/store/slices/blogSlice';

import { NavigationContainer } from '@react-navigation/native'

import MainNavigation from './src/navigation/MainNavigation';
import AuthNavigation from './src/navigation/AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        dispatch(setIsLogin(true));
      }
    } catch (error) {
      console.log("check auth error: ", error)
    } finally {
      setTimeout(() => {
        dispatch(setIsSplash(false));
      }, 2000);
    }
  }



  useEffect(() => {
    checkAuth()
  }, [])

  if (state.isSplash) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer >
      {state.isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );

}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

})