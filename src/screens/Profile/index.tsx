import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      
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
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles=StyleSheet.create({
  displayProfile:{
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage:{
      width: 170,
    height: 170,
    borderRadius: 100,
    resizeMode: 'cover',
  },
   containerContent: {
    paddingLeft: 20,
  },
   userIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
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
  },

  setDescription: {
    color: 'grey',
  },
})
