import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TitleDescriptionCard = () => {
  return (
    <View style={styles.titleDescriptionBox} >
      <Text>MY First Bloge</Text>
            <Text>hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj </Text>

    </View>
  )
}

export default TitleDescriptionCard

const styles = StyleSheet.create({
    titleDescriptionBox:{
borderWidth:1,
borderColor:"black",
borderRadius:10,
padding:10,
marginTop:10,
marginHorizontal:5
    }
})