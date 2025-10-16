import React, { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLike, } from '../store/slices/blogSlice';
import { SafeAreaView } from 'react-native-safe-area-context';


const TitleDescriptionCard = ({ name, title, description }) => {

  const [showFullText, setShowFullText] = useState(false);
  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const toggleText = () => {
    setShowFullText(!state.showFullText);
  };



  return (
    <View style={styles.titleDescriptionBox}>
      <View style={styles.dpAndTitle}>
        <Image
          source={require('../assests/images/block1.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <Text style={styles.titleText}>{title}</Text>
      {/* <Text
        ellipsizeMode="tail"
        numberOfLines={3}>
        {description}
      </Text> */}
      <Text numberOfLines={showFullText ? undefined : 3} ellipsizeMode="tail">
        {description || ''}
      </Text>

      {typeof description === 'string' && description.length > 100 && (
        <Pressable onPress={toggleText}>
          <Text style={styles.moreLessText}>
            {showFullText ? 'Show less' : 'Read more'}
          </Text>
        </Pressable>
      )}
      <View style={styles.likeCommentIconBox}>
        <Pressable onPress={() => dispatch(setIsLike(prev => !prev))}>
          {!state.isLike ? (
            <Image
              style={styles.likeCommentIcon}
              source={require("../assests/images/unlike.png")}
            />
          ) : (
            <Image
              style={styles.likeCommentIcon}
              source={require("../assests/images/like.png")}
            />
          )}
        </Pressable>
        <Image
          style={styles.likeCommentIcon}
          source={require("../assests/images/comment.png")}
        />
      </View>
    </View>

  )
}

export default TitleDescriptionCard

const styles = StyleSheet.create({

  titleDescriptionBox: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    paddingHorizontal: 10,

  },
  nameText: {
    fontSize: 16
  },
  titleText: {
    fontSize: 18
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
  likeCommentIcon: {
    width: 25,
    height: 25,
  },
  likeCommentIconBox: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10
  },
  moreLessText: {
    color: 'blue',
    marginTop: 4,
    fontWeight: '600',
  },
})



