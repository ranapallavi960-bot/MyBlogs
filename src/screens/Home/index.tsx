import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import TitleDescriptionCard from '../../Components/TitleDescriptionCard'
// import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const navigation=useNavigation()

  // const getData= async()=>{
  //   const usersCollection = firestore().collection('Users');
  // }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#b4a7d6', '#9fc5e8']}>
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assests/images/splash.png")}
            style={styles.appLogo}
          />

          <Pressable onPress={()=>navigation.navigate("TitleDescription")}>
            <Image
              source={require("../../assests/images/add.png")}
              style={styles.add}

            />
          </Pressable>

        </View>


      </LinearGradient>
        <TitleDescriptionCard/>

    </SafeAreaView>
  )
}

export default HomeScreen
