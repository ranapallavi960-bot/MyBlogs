import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setInputValues } from '../store/slices/blogSlice'

const TitleDescriptionComponent = () => {
const state = useSelector((state: any) => state.blogs)
  const dispatch = useDispatch()

    const navigation=useNavigation()
    const onHandleChange = (value, field) => {
            console.log("field : ", field)
            console.log("value : ", value)
    
            dispatch(setInputValues({ [field]: value }))
        }
 const handlePost=()=>{
      if (!state.title.trim() || !state.description.trim()) {
            Alert.alert('Please fill both fields!')
            return
        }
        console.log('Title:', state.title)
        console.log('Description:', state.description)
        Alert.alert('Post created!')
        navigation.goBack()
 }

    return (
        <View style={styles.containerContent}>
            <View style={styles.header}>
                <Pressable onPress={()=>navigation.goBack()}><Image style={{ width: 15, height: 15 }} source={require("../assests/images/cross.png")} /></Pressable>
                <Pressable onPress={()=>handlePost()}><Text style={styles.postBtn}>Post</Text></Pressable>
            </View>
            <View style={styles.titleDescriptionBox}>
                <Text style={styles.titleLable}>Title</Text>
                <View style={styles.titleInput}>

                    <TextInput
                        placeholder='Enter title'
                        value={state.title}
                        onChangeText={(value)=>onHandleChange(value,'title')}
                    />
                </View>
                <Text style={styles.descriptionlabel}>Description</Text>
                <View style={styles.descriptionInput}>
                    <TextInput
                        placeholder='Enter description'
                        value={state.description}
                        onChangeText={(value)=>onHandleChange(value,'description')}
                        style={styles.description}
                        multiline
                    />
                </View>
            </View>
        </View>
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
        borderColor: "black",
        marginTop: 5,
        width: "100%",
        height: "40%",

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
    titleLable: {
        fontSize: 16
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


})
