import React from 'react'
import { Stack } from './navigation.config'
import LoginScreen from '../screens/Login'
import LoginSignUpScreen from '../screens/LoginOrSignUp'
import SignUpScreen from '../screens/SignUp'

const AuthNavigation = () => {
  return (
    <Stack.Navigator 
     initialRouteName="LoginOrSignUp"
      screenOptions={{
        headerShown: false,
      }}
    >
       <Stack.Screen
          name="LoginOrSignUp"
          component={LoginSignUpScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation
