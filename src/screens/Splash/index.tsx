import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeIn } from 'react-native-reanimated';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#b4a7d6', '#9fc5e8']} style={{flex:1}}>
            <View style={styles.containerContent}>
              
 {/* <Image */}
 <Animated.Image
      style={styles.splashImage}
      entering={FadeIn.duration(500)}
      source={require('../../assests/images/splash.png')}
      
      />
      <Text style={styles.heading}>MyBlogs</Text>
            </View>
     
      </LinearGradient>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles=StyleSheet.create({
    container:{

flex:1
    },
    containerContent:{
//  alignSelf:"center",
justifyContent:"center",
alignItems:"center",
flex:1

    },
   splashImage:{
    width:Dimensions.get('screen').width*0.30,
    height:Dimensions.get('screen').width*0.30,
    
// alignSelf:"center"
   },
   heading:{
    color:"#073763",
    fontSize:50,
    fontWeight:"bold",
    // alignItems:"center"
   } 
})