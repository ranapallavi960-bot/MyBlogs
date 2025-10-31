import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import { requestPermissions } from '../utils/permissions'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'




const TitleDescriptionComponent = () => {
    const state = useSelector((state: any) => state.blogs)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState<string | null>(null);
    const [activeIndicator, setActiveIndicator] = useState(false)

    const navigation = useNavigation()

    const choosePhotoFromLibrary = async () => {
        const permission = await requestPermissions();
        if (!permission) return;
        ImagePicker.openPicker({
            width: 320,
            height: 280,
            cropping: true,

        })
            .then((image) => {
                console.log(image);
                setImage(image?.path);
            })
            .catch((error) => {
                console.log('Error picking image:', error);
            });
    };

    const takePhotoFromCamera = async () => {
        const permission = await requestPermissions();

        if (!permission) return;
        ImagePicker.openCamera({
            width: 320,
            height: 280,
            cropping: true,

        })
            .then((image) => {
                console.log(image);
                setImage(image?.path);
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


    const uploadImage = async (imagePath: string) => {
        if (!imagePath) {
            console.log('No image path found.');
            return null;
        }

        try {
            const uploadUri = imagePath

            console.log('Uploading image from:', uploadUri);

            const filename = uploadUri.substring(uploadUri?.lastIndexOf('/') + 1);
            console.log("filename:", filename)
            const reference = storage().ref(`blogImages/${filename}`);

            // Upload to Firebase Storage
            await reference.putFile(uploadUri);

            // Get download URL
            const url = await reference.getDownloadURL();
            console.log('Uploaded image URL:', url);
            return url;
        } catch (error: any) {
            console.log('Image upload failed:', error);
            Alert.alert('Image upload failed', error?.message);
            return null;
        }
    };


    const addBlog = async () => {

        try {
            setActiveIndicator(true)
            let imageUrl = null;

            // 🔹 Step 1: upload image to Firebase Storage
            if (image) {
                imageUrl = await uploadImage(image);
                if (imageUrl == null) {
                    return
                }
            }
            console.log("imageUrl:", imageUrl)
            //  const url = await reference.getDownloadURL();

            // 🔹 Step 2: Save blog in Firestore
            await firestore().collection('blogs').add({
                name,
                title,
                description,
                image: imageUrl || null, //  stores image URL here
                createdAt: new Date(),
            });

            Alert.alert('Post created successfully!');
            navigation.goBack();

        } catch (error) {
            console.log('Error adding blog:', error);
            Alert.alert('Something went wrong while creating the post.');
        } finally {
            setActiveIndicator(false)
        }
    };


    const handlePost = async () => {
        if (!title || !description) {
            Alert.alert('Please fill all fields');
            return;
        }
        await addBlog();
    };

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView style={styles.containerContent}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()}><Image style={{ width: 15, height: 15 }} source={require("../assests/images/cross.png")} /></Pressable>
                    <Pressable onPress={() => handlePost()}><Text style={styles.postBtn}>Post</Text></Pressable>
                </View>
                <View style={styles.titleDescriptionBox}>                   
                    <Text style={styles.lable}>Title</Text>
                    <View style={styles.titleInput}>

                        <TextInput
                            placeholder='Enter title'
                            value={title}
                            onChangeText={(value) => setTitle(value)}
                        />
                    </View>
                    <Text style={styles.descriptionlabel}>Description</Text>
                    <View style={styles.descriptionInput}>
                        <TextInput
                            placeholder='Enter description'
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                            style={styles.description}
                            multiline
                        />
                    </View>
                    <Pressable onPress={openOptions} style={styles.imagePressable} >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={styles.selectedImage}
                            />
                        ) : (
                            <Image
                                source={require('../assests/images/camera.png')}
                                style={styles.cameraIcon}
                            />
                        )}
                    </Pressable>

                </View>

            </ScrollView>
            {activeIndicator && <View style={styles.activeIndicatorbox}>
                <ActivityIndicator color='black' />
            </View>}


        </KeyboardAvoidingView>

    )
}

export default TitleDescriptionComponent

const styles = StyleSheet.create({

    containerContent: {
        backgroundColor: "#efedd7",
        flex: 1
    },
    description: {

    },

    descriptionInput: {
        borderWidth: 1,
        borderColor: "gray",
        marginTop: 5,
        minHeight: 120,


    },
    titleInput: {
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        marginTop: 5
    },
    titleDescriptionBox: {
        backgroundColor: "#ffff",
        paddingHorizontal: 10,
        marginTop: 40,
        paddingVertical: 10,


    },
    lable: {

        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 3,
    },
    descriptionlabel: {
        fontSize: 16
    },
    postBtn: {
        fontSize: 18,
        color: "green"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginTop: 20
    },
    selectedImage: {
        width: '100%',
        height: '100%',
    },

    cameraIcon: {
        width: 50,
        height: 50,
        tintColor: 'black',
        opacity: 0.8,
    },
    imagePressable: {
        marginTop: 10,
        height: 200,
        borderWidth: 1,
        borderColor: 'gray',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',

    },
    removeBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18,
    },
    activeIndicatorbox: {
        // flex:1
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: "absolute",
        zIndex: 9,
        backgroundColor: '#00000040'
    }
})
