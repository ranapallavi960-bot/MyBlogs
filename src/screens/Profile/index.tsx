import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin } from '../../store/slices/blogSlice'

const ProfileScreen = () => {

  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      await AsyncStorage.clear()
      dispatch(setIsLogin(false))
    } catch (error) {
      console.log("logout error: ", error);
    }
  };
  const onLogOut=()=>{
    logout()
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#b4a7d6', '#9fc5e8']} style={{ flex: 1 }}>
        <View style={styles.displayProfile}>
          <Image
            source={require('../../assests/images/block1.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.containerContent}>
          <View style={styles.aboutUser}>
            <Image
              style={styles.userIcon}
              source={require('../../assests/images/user.png')}
            />
            <View>
              <Text style={styles.setTitle}>Name</Text>
              <Text style={styles.setDescription}>Pallavi Rana</Text>
            </View>
          </View>

          <View style={styles.aboutUser}>
            <Image
              style={styles.userIcon}
              source={require('../../assests/images/about.png')}
            />
            <View>
              <Text style={styles.setTitle}>About</Text>
              <Text style={styles.setDescription}>
                Hey there! i am using ToDo
              </Text>
            </View>
          </View>

          <View style={styles.aboutUser}>
            <Image
              style={styles.userIcon}
              source={require('../../assests/images/contact.png')}
            />
            <View>
              <Text style={styles.setTitle}>Contact</Text>
              <Text style={styles.setDescription}>9834759367</Text>
            </View>
          </View>
          <Pressable style={styles.logOutBox} onPress={onLogOut}>
            <Image
              source={require("../../assests/images/logOut.png")}
              style={styles.logOutIcon}
            />
            <Text style={styles.logOut}>LogOut</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View >
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  displayProfile: {
    alignItems: 'center',
    marginTop: 50
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  containerContent: {
    paddingLeft: 20,
    marginTop: 50
  },
  userIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  aboutUser: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  setTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',

  },

  setDescription: {
    color: '#fff',
  },
  logOut: {
    color: "red"
  },
  logOutIcon: {
    width: 20,
    height: 20,
  },
  logOutBox: {
    flexDirection: "row",
    gap: 10,

  },
})
