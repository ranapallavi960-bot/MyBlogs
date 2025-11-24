import React, { FC, useEffect, useState } from 'react'
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
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
        
      });
      setCount(updatedLikes.length);

      // Update Redux
    
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
      console.log("Error fetching user -------------------> :", error)
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

  const deleteComment = async (commentId: string, commentUserId?: string) => {
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
    let unsubscribe: any;

    if (commentModalVisible) {
      unsubscribe = firestore()
        .collection('blogs')
        .doc(id)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const commentList: CommentType[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

      <Pressable onPress={() => setImageModalVisible(true)} style={{ alignSelf: "center" }}>
        {image && (
          <Image
            style={{ width: 320, height: 280, resizeMode: 'contain' }}
            source={{ uri: image }}
          />
        )}
      </Pressable>

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
      <Modal
        visible={commentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.commentOverlay}>
          {/* Background dimmed area */}
          <Pressable style={styles.overlayTouchable} onPress={() => setCommentModalVisible(false)} />

          {/* Bottom Sheet */}
          <View style={styles.commentSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.commentHeader}>Comments</Text>

            {/* Scrollable comments area */}
            <View style={{ flex: 1 }}>
              <ScrollView
                contentContainerStyle={styles.commentScrollArea}
                showsVerticalScrollIndicator={false}
              >
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <View key={item?.id} style={styles.commentItem}>
                      <Image
                        source={
                          item.profileImage
                            ? { uri: item.profileImage }
                            : require('../assests/images/block1.png')
                        }
                        style={styles.commentUserImage}
                      />
                      <View style={styles.commentTextContainer}>
                        <Text style={styles.commentName}>{item.name}</Text>
                        <Text style={styles.commentText}>{item?.text}</Text>
                      </View>
                      {item?.userId === userData?.uid && (
                        <Pressable onPress={() => deleteComment(item?.id, item?.userId)}>
                          <Image
                            source={require('../assests/images/delete.png')}
                            style={styles.commentDeleteIcon}
                          />
                        </Pressable>
                      )}
                    </View>
                  ))
                ) : (
                  <Text style={styles.noCommentsText}>No comments yet</Text>
                )}
              </ScrollView>
            </View>

            {/* Comment input bar */}
            <View style={styles.commentInputBar}>
              <Image
                source={
                  userData?.image
                    ? { uri: userData.image }
                    : require('../assests/images/block1.png')
                }
                style={styles.inputUserImage}
              />
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
                placeholderTextColor="#888"
                style={styles.commentInput}
              />
              <Pressable onPress={postComment} disabled={!commentText.trim()}>
                <Text
                  style={[
                    styles.postButtonText,
                    { color: commentText.trim() ? '#0095f6' : '#b2dffc' },
                  ]}
                >
                  Post
                </Text>
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

  commentInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  postButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 6,
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

  commentBottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    maxHeight: '75%',
  },

  dragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },

  commentInputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    color: '#000',
  },

  commentSendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  commentSendText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  overlayTouchable: {
    flex: 1,
    width: '100%',
  },

commentSheet: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  maxHeight: '80%',
  width: '100%',
  paddingHorizontal: 15,
  paddingTop: 8,
  flex: 1,
},

  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },

  commentHeader: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },

 commentScrollArea: {
  paddingBottom: 10, // only small padding
},

  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },

  commentUserImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#eee',
  },

  commentTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  commentName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },

  commentText: {
    fontSize: 14,
    color: '#222',
    lineHeight: 18,
  },

  commentDeleteIcon: {
    width: 16,
    height: 16,
    tintColor: 'red',
    marginLeft: 5,
  },

  noCommentsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 15,
    fontSize: 13,
  },

 commentInputBar: {
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth: 0.5,
  borderColor: '#ddd',
  paddingHorizontal: 10,
  paddingVertical: 8,
  backgroundColor: '#fff',
  marginTop: 0, // ensure no gap above input
},

  inputUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },

  commentInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    color: '#000',
    backgroundColor: '#f0f2f5', // 👈 light gray background
    borderRadius: 20,
    marginRight: 8,
  },

  postButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

})


