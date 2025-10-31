import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, View, Alert, StyleSheet,TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import { requestPermissions } from '../../utils/permissions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { setUserData } from '../../store/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.userDetail.data);
  const dispatch = useDispatch();

  const [image, setImage] = useState(userData?.image || null);
  const [name, setName] = useState(userData?.name || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [contact, setContact] = useState(userData?.contact || '');

  // 🔧 Function to update user in Firestore and Redux
  const updateUser = async () => {
    const user = auth().currentUser;
    if (!user) return Alert.alert('Error', 'No logged in user found');

    try {
      // Update Firestore
      await firestore().collection('users').doc(user.uid).update({
        name,
        email,
        image,
        contact,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      // Update Redux
      dispatch(setUserData({ name, email, image, contact }));

      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(), // Go back when alert is dismissed
        },
      ]);
    } catch (error) {
      console.log('Error updating user:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  const choosePhotoFromLibrary = async () => {
    const permission = await requestPermissions();
    if (!permission) return;
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        setImage(image.path);
      })
      .catch((error) => {
        console.log('Error picking image:', error);
      });
  };

  const takePhotoFromCamera = async () => {
    const permission = await requestPermissions();
    if (!permission) return;
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image) => {
        setImage(image.path);
      })
      .catch((error) => {
        console.log('Error capturing image:', error);
      });
  };

  const openOptions = () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: takePhotoFromCamera },
        { text: 'Gallery', onPress: choosePhotoFromLibrary },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView>
    <KeyboardAvoidingView behavior='padding'>
      <ScrollView>
      <Pressable style={{ alignItems: 'center', marginTop: 50 }} onPress={openOptions}>
        <View
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: '#ccc',
          }}
        >
          <ImageBackground
            source={
              image
                ? { uri: image }
                : require('../../assests/images/block1.png')
            }
            style={{ width: '100%', height: '100%' }}
          >
            <Image
              source={require('../../assests/images/camera.png')}
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
                tintColor: '#fff',
                marginTop: 50,
              }}
            />
          </ImageBackground>
        </View>
        <Text style={{ marginTop: 10, color: '#000' }}>Edit Profile Photo</Text>
      </Pressable>

      <View style={styles.containerContent}>
        
        <View style={styles.aboutUser}>
          <Image
            style={styles.userIcon}
            source={require('../../assests/images/user.png')}
          />
          <View style={{flex:1,gap:10}} >
            <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.description}
                value={name}
                onChangeText={setName}
              />
          </View>
        </View>

       <View style={styles.aboutUser}>
          <Image
            style={styles.userIcon}
            source={require('../../assests/images/email.png')}
          />
          <View style={{flex:1,gap:10}} >
            <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.description}
                value={email}
                onChangeText={setEmail}
              />
          </View>
        </View>

        <View style={styles.aboutUser}>
          <Image
            style={styles.userIcon}
            source={require('../../assests/images/contact.png')}
          />
          <View style={{flex:1,gap:10}} >
            <Text style={styles.label}>Contact</Text>
              <TextInput
                style={styles.description}
                value={contact}
                onChangeText={setContact}
              />
          </View>
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          style={{ marginTop: 30, marginHorizontal: 20, backgroundColor: '#7b68ee' }}
          onPress={updateUser}
        >
          Save Changes
        </Button>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userIcon: {
    width: 20,
    height: 20,
    tintColor: '#999999',
  },
  containerContent: {
    paddingHorizontal: 20,
    // marginTop: 50,
    // backgroundColor: "pink"
  },
  aboutUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    gap: 10,
  },
  description: {
    backgroundColor: "#e6e5e5ff",
   paddingHorizontal:10


  },
});

