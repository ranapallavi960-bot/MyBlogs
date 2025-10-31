import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "./slices/blogSlice";
import { userReducer } from "./slices/userSlice";

export const store= configureStore({
    reducer:{
        blogs:blogReducer,
        userDetail:userReducer
    }
})

// import React, { useEffect, useState } from 'react'
// import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
// import firestore from '@react-native-firebase/firestore'
// import { useDispatch, useSelector } from 'react-redux'
// import { setIsLike } from '../store/slices/blogSlice'
// import auth from '@react-native-firebase/auth'
// import { setUserData } from '../store/slices/userSlice'


// const TitleDescriptionCard = ({ name, title, description, image,itemKey }) => {
//   const [showFullText, setShowFullText] = useState(false)
//   const [modalVisible, setModalVisible] = useState(false)
//   const userData = useSelector(state => state.userDetail.data)
//    const state = useSelector(state => state.blogs)
//   const dispatch = useDispatch()

//   const toggleText = () => setShowFullText(!showFullText)

//   const toggleText = () => {
//   setShowFullText(prev => !prev);
// };
//   const getUserData = async () => {
//     try {
//       const currentUser = auth().currentUser // 👈 Get logged-in user
//       if (currentUser) {
//         const uid = currentUser.uid
//         console.log("Current UID:", uid)

//         const userDoc = await firestore().collection('users').doc(uid).get()
//         if (userDoc.exists) {
//           dispatch(setUserData(userDoc.data()));
//         } else {
//           console.log("No user found with this UID")
//         }
//       } else {
//         console.log("No user logged in")
//       }
//     } catch (error) {
//       console.log("Error fetching user:", error)
//     }
//   }


//   useEffect(() => {
//     getUserData()
//   }, []);

//  const onDelete = () => {
//     firestore().collection("blogs")
//       .doc(itemKey)
//       .delete()
//       try {
//         Alert.alert("blog deleted")
//       } catch (error) {
//         Alert.alert("error happened")
//       }
//   }

//   const onDeletePress = () => setModalVisible(true)
//   const confirmDelete = () => { setModalVisible(false); onDelete() }
//   const cancelDelete = () => setModalVisible(false)
