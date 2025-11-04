import React, { FC, useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { setUserData } from '../store/slices/userSlice'

const TitleDescriptionCard: FC<BlogType> = ({ title, description, image, id, likes = [] }) => {
  const [showFullText, setShowFullText] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [count, setCount] = useState(likes?.length || 0);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);


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

  const postComment = async () => {
    if (!commentText.trim()) return Alert.alert('Error', 'Please write something.');

    try {
      const newComment = {
        text: commentText,
        userId: userData?.uid,
        name: userData?.name,
        profileImage: userData?.image || '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection('blogs')
        .doc(id)
        .collection('comments')
        .add(newComment);

      setCommentText('');
      fetchComments(); // refresh list after posting
    } catch (error) {
      console.log('Error posting comment:', error);
      Alert.alert('Error', 'Unable to post comment.');
    }
  };

  const fetchComments = async () => {
    try {
      const snapshot = await firestore()
        .collection('blogs')
        .doc(id)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .get();

      const commentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentList);
    } catch (error) {
      console.log('Error fetching comments:', error);
    }
  };

  const deleteComment = async (commentId:string, commentUserId?:string) => {
    if (userData?.uid !== commentUserId) {
      return Alert.alert('Error', 'You can delete only your own comment.');
    }

    Alert.alert(
      'Delete Comment',
      'Are you sure you want to delete this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore()
                .collection('blogs')
                .doc(id)
                .collection('comments')
                .doc(commentId)
                .delete();
              Alert.alert('Deleted', 'Comment deleted successfully.');
            } catch (error) {
              console.log('Error deleting comment:', error);
              Alert.alert('Error', 'Unable to delete comment.');
            }
          },
        },
      ],
    );
  };


  useEffect(() => {
    getUserData()
    let unsubscribe:any;

    if (commentModalVisible) {
      unsubscribe = firestore()
        .collection('blogs')
        .doc(id)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const commentList:CommentType[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setComments(commentList);
        });
    }

    return () => unsubscribe && unsubscribe(); // clean up listener
  }, [commentModalVisible]);


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
      {/* <View style={{ alignSelf: "center" }}>
        {image && (
          <Image
            style={{ width: 320, height: 280, resizeMode: 'contain', }}
            source={{ uri: image }}
          />
        )}
      </View> */}

      <Pressable onPress={() => setImageModalVisible(true)} style={{ alignSelf: "center" }}>
        {image && (
          <Image
            style={{ width: 320, height: 280, resizeMode: 'contain' }}
            source={{ uri: image }}
          />
        )}
      </Pressable>


      {/* <View style={styles.likeCommentDeleteIconBox}>

        <View style={{ alignItems: 'center',flexDirection:"row",gap:10 }}>
         <View>
           <Pressable onPress={updateUser}>
            {!likes?.includes(userData.uid) ? (
              <Image
                style={styles.likeCommentDeleteIcon}
                source={require("../assests/images/unlike.png")}
              />
            ) : (
              <Image
                style={styles.likeCommentDeleteIcon}
                source={require("../assests/images/like.png")}
              />
            )}
           </Pressable>
           {count > 0 && (
            <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 3 }}>{count}</Text>
           )}
         </View>
         <Image
         source={require("../assests/images/comment.png")}
         style={styles.likeCommentDeleteIcon}
         />
        </View>

        <Pressable onPress={onDeletePress}>
          <Image
            source={require("../assests/images/delete.png")}
            style={styles.likeCommentDeleteIcon}
          />
        </Pressable>
        
      </View> */}

      <View style={styles.likeCommentDeleteIconBox}>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable onPress={updateUser} style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              style={styles.likeCommentDeleteIcon}
              source={
                likes?.includes(userData.uid)
                  ? require("../assests/images/like.png")
                  : require("../assests/images/unlike.png")
              }
            />
            {count > 0 && (
              <Text style={{ fontSize: 14, fontWeight: '600' }}>{count}</Text>
            )}
          </Pressable>

          <Pressable onPress={() => setCommentModalVisible(true)}>
            <Image
              source={require("../assests/images/comment.png")}
              style={styles.likeCommentDeleteIcon}
            />
          </Pressable>

        </View>


        <Pressable onPress={onDeletePress}>
          <Image
            source={require("../assests/images/delete.png")}
            style={styles.likeCommentDeleteIcon}
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
      {/* Image Preview Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.imageModalBackground}>
          <Pressable
            onPress={() => setImageModalVisible(false)}
            style={styles.backButtonContainer}
          >
            <Image
              source={require('../assests/images/cross.png')} // <-- apne icon ka path yahan lagao
              style={styles.backButtonIcon}
            />
          </Pressable>

          <Image
            source={{ uri: image }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
      {/* Comment Modal */}
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.commentModalBackground}>
          <View style={styles.commentModalContainer}>
            <Text style={styles.commentHeader}>Comments</Text>

            {/* Input */}
            <View style={styles.commentInputBox}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                style={styles.commentInput}
              />
              <Pressable onPress={postComment} style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
              </Pressable>
            </View>

            {/* Comments List */}
            <View style={styles.commentList}>
              <View style={styles.commentList}>
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <View key={item?.id} style={styles.singleComment}>
                      <View style={styles.commentHeaderRow}>
                        <View style={styles.commentUserInfo}>
                          <Image
                            source={
                              item.profileImage
                                ? { uri: item.profileImage }
                                : require('../assests/images/block1.png')
                            }
                            style={styles.commentUserImage}
                          />
                          <Text style={styles.commentName}>{item.name}</Text>
                        </View>

                        {item?.userId === userData?.uid && (
                          <Pressable onPress={() => deleteComment(item?.id, item?.userId)}>
                            <Image
                              source={require('../assests/images/delete.png')}
                              style={{ width: 18, height: 18, tintColor: 'red' }}
                            />
                          </Pressable>
                        )}
                      </View>

                      <Text style={styles.commentText}>{item?.text}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={{ textAlign: 'center', color: '#666' }}>No comments yet</Text>
                )}
              </View>


            </View>

            <Pressable onPress={() => setCommentModalVisible(false)} style={styles.closeCommentButton}>
              <Text style={styles.closeCommentText}>Close</Text>
            </Pressable>
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
  likeCommentDeleteIcon: {
    width: 25,
    height: 25,
  },
  likeCommentDeleteIconBox: {
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
  },
  imageModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 30,
  },
  backButtonIcon: {
    width: 15,
    height: 15,
    tintColor: '#fff',
  },
  commentModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentModalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    maxHeight: '80%',
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  commentInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentList: {
    marginTop: 10,
  },
  singleComment: {
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 6,
  },
  commentName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 13,
    color: '#333',
  },
  closeCommentButton: {
    marginTop: 10,
    backgroundColor: 'gray',
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeCommentText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  commentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentUserImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
  },

})


