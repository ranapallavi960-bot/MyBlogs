import React, { FC, useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { setUserData } from '../store/slices/userSlice'

const TitleDescriptionCard: FC<BlogType> = ({ name, title, description, image, id, likes = [] }) => {
  const [showFullText, setShowFullText] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [count, setCount] = useState(likes?.length || 0);
  const userData = useSelector((state: any) => state.userDetail.data)
  const state = useSelector((state: any) => state.blogs)
  const dispatch = useDispatch()

  const updateUser = async () => {

    try {
      const updatedLikes = likes?.includes(userData?.uid) ? likes.filter(id => id != userData.uid) : [...likes, userData?.uid]
      // Update Firestore
      await firestore().collection('blogs').doc(id).update({
        likes: updatedLikes,
        // updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      setCount(updatedLikes.length);

      // Update Redux
      // Alert.alert('Success', 'Profile updated successfully!',);
    } catch (error) {
      console.log('Error updating user:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  const toggleText = () => {
    setShowFullText(prev => !prev);
  };

  const onDelete = async () => {
    try {
      await firestore().collection("blogs").doc(id).delete();
      Alert.alert("Success", "Blog deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error);
      Alert.alert("Error", "Something went wrong while deleting!");
    }
  };

  const getUserData = async () => {
    try {
      const currentUser = auth().currentUser // Get logged-in user
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
      console.log("Error fetching user:", error)
    }
  }

  useEffect(() => {
    getUserData()
  }, []);



  const onDeletePress = () => setModalVisible(true)
  const confirmDelete = () => { setModalVisible(false); onDelete() }
  const cancelDelete = () => setModalVisible(false)

  return (
    <View style={styles.titleDescriptionBox}>
      <View style={styles.dpAndTitle}>
        <Image
          source={
            userData?.image
              ? { uri: userData.image }
              : require('../assests/images/block1.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{userData?.name}</Text>
        {/* <Text>{userData?.createdAt}</Text> */}
      </View>

      <Text style={styles.titleText}>{title}</Text>

      <Text
        numberOfLines={showFullText ? undefined : 3}
        ellipsizeMode="tail"
        style={styles.descriptionText}>
        {description || ''}
      </Text>

      {typeof description === 'string' && description.length > 100 && (
        <Pressable onPress={toggleText}>
          <Text style={styles.moreLessText}>
            {showFullText ? 'Show less' : 'Read more'}
          </Text>
        </Pressable>
      )}
      <View style={{ alignSelf: "center" }}>

        {image && (
          <Image
            style={{ width: 320, height: 280, resizeMode: 'contain', }}
            source={{ uri: image }}
          />
        )}
      </View>

      <View style={styles.likeIconDeleteBox}>

        {/* <View >

          <Pressable onPress={updateUser} style={{ alignItems:"center" }} >
            {!likes?.includes(userData.uid) ? (
              <Image
                style={styles.likeIcon}
                source={require("../assests/images/unlike.png")}
              />
            ) : (
              <Image
                style={styles.likeIcon}
                source={require("../assests/images/like.png")}
              />
            )}

          </Pressable>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>{count}</Text>
        </View> */}
        <View style={{ alignItems: 'center' }}>
          <Pressable onPress={updateUser}>
            {!likes?.includes(userData.uid) ? (
              <Image
                style={styles.likeIcon}
                source={require("../assests/images/unlike.png")}
              />
            ) : (
              <Image
                style={styles.likeIcon}
                source={require("../assests/images/like.png")}
              />
            )}
          </Pressable>
{count > 0 && (
  <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 3 }}>{count}</Text>
)}
        </View>

        <Pressable onPress={onDeletePress}>
          <Image
            source={require("../assests/images/delete.png")}
            style={styles.deleteIcon}
          />
        </Pressable>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this blog?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.noButton} onPress={cancelDelete}>
                <Text style={styles.noText}>No</Text>
              </Pressable>
              <Pressable style={styles.yesButton} onPress={confirmDelete}>
                <Text style={styles.yesText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default TitleDescriptionCard

const styles = StyleSheet.create({
  titleDescriptionBox: {
    elevation: 10,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
  nameText: {
    fontSize: 16
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  dpAndTitle: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  descriptionText: {
    marginBottom: 10
  },
  likeIcon: {
    width: 25,
    height: 25,
  },
  likeIconDeleteBox: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between"
  },
  moreLessText: {
    color: 'blue',
    marginTop: 4,
    fontWeight: '600',
  },
  deleteIcon: {
    width: 25,
    height: 25,
  },
  likeCommentIconbox: {
    flexDirection: "row",
    gap: 10
  },

  // Modal styles
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


