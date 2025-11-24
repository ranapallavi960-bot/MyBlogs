import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin } from '../../store/slices/blogSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { setUserData } from '../../store/slices/userSlice'

const ProfileScreen = () => {
  const userData:UserType = useSelector((state:any) => state.userDetail.data)
  const state=useSelector((state:any)=>state.blogs)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)

  const logout = async () => {
    try {
      await AsyncStorage.clear()
      dispatch(setIsLogin(false))
    } catch (error) {
      console.log("logout error: ", error);
    }
  }

  const getUserData = async () => {
    try {
      const currentUser = auth().currentUser // 👈 Get logged-in user
      if (currentUser) {
        const uid = currentUser.uid
        console.log("Current UID:", uid)

        const userDoc = await firestore().collection('users').doc(uid).get()
        if (userDoc.exists()) {
          dispatch(setUserData(userDoc.data()));
        } else {
          console.log("No user found with this UID")
        }
      } else {
        console.log("No user logged in")
      }
    } catch (error) {
      console.log("Error fetching user =========>:", error)
    }
  }


  useEffect(() => {
    getUserData()
  }, []);

  const onLogOut = () => {
    setModalVisible(true) // modal open
  }

  const handleConfirmLogout = () => {
    setModalVisible(false)
    logout()
  }

  const handleCancelLogout = () => {
    setModalVisible(false)
  }


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.displayProfile}>
        <Image
          source={
            userData?.image
              ? { uri: userData.image }
              : require('../../assests/images/block1.png')
          }
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
            <Text style={styles.setDescription}>{userData?.name}</Text>
          </View>
        </View>

        <View style={styles.aboutUser}>
          <Image
            style={styles.userIcon}
            source={require('../../assests/images/email.png')}
          />
          <View>
            <Text style={styles.setTitle}>Email</Text>
            <Text style={styles.setDescription}>
              {userData?.email}
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
            <Text style={styles.setDescription}>{userData?.contact}</Text>
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

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.noButton} onPress={handleCancelLogout}>
                <Text style={styles.noText}>No</Text>
              </Pressable>
              <Pressable style={styles.yesButton} onPress={handleConfirmLogout}>
                <Text style={styles.yesText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
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
    tintColor: '#999999',
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
    color: '#999999',
  },
  logOut: {
    color: "red",
    fontWeight: 'bold'
  },
  logOutIcon: {
    width: 20,
    height: 20,
  },
  logOutBox: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20
  },

  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  yesButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  noButton: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  yesText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  noText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
