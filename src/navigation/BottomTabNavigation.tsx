import React from 'react'
import { Tab } from './navigation.config'
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'
import { Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const tabBaricons = {
  activeHome: require("../assests/images/activeHome.png"),
  inActiveHome: require("../assests/images/inactiveHome.png"),
  activeProfile: require("../assests/images/activeprofile.png"),
  inActiveProfile: require("../assests/images/inactiveProfile.png"),

}


const BottomTabNavigation = () => {
   const navigation = useNavigation();
  const getTabBarIcon = (routeName, focused,) => {
    let iconName;
    console.log("iconName:", routeName)
    if (routeName === 'Home') {
      iconName = focused ? tabBaricons.activeHome : tabBaricons.inActiveHome;
    }
    else if (routeName === 'Profile') {
      iconName = focused ? tabBaricons.activeProfile : tabBaricons.inActiveProfile;
    }


    return <Image source={iconName} style={{ width: 25, height: 25 }} />;
  };

const onEditProfile=()=>{
   navigation.navigate("EditProfile")
}

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon(route.name, focused,),

      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ 
        headerShown: true ,
        headerRight:()=><Pressable style={{paddingRight:15}} onPress={onEditProfile} ><Image source={require('../assests/images/editProfile.png')} style={{width:25 ,height:25,}} /></Pressable>,
          headerStyle: {
      backgroundColor: '#9fc5e8', // 👈 yahan apna color do
    },
        }}/>
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
