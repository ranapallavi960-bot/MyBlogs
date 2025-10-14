import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';


const TitleDescriptionCard = () => {

  


  return (
    <View style={styles.titleDescriptionBox} >
      <View style={styles.dpAndTitle}>
        <Image
          source={require('../assests/images/block1.png')}
          style={styles.profileImage}
        />
        <Text style={styles.title}>MY First Blog</Text>
      </View>
      <Text>hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj </Text>
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
    marginTop: 10,
    marginHorizontal: 5
  },
  title: {
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
})
 