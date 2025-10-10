import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { setInputValues } from '../../store/slices/blogSlice'

const LoginScreen = () => {
    const state = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const loginWithEmailPassword = async () => {
        try {
            // console.log("state:",state)
            // const result = await auth().signInWithEmailAndPassword(state.email, state.password)
            
            // console.log("result: ",result)
            navigation.navigate("BottomTabs")
            // Alert.alert("Logged successfully")
            
        } catch (error: any) {
              console.log("result: ",error)
            Alert.alert(error.message)
        }
    }
    const onHandleChange = (value, field) => {
        console.log("field : ", field)
        console.log("value : ", value)

        dispatch(setInputValues({ [field]: value }))
    }
    const onLogin = () => {
        loginWithEmailPassword()

    }


    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#b4a7d6', '#9fc5e8']} style={{ flex: 1 }}>

                <View style={styles.containerData}>
                    <View style={styles.headingBox}>
                        <Text style={styles.heading1}>Welcome,</Text>
                        <Text style={styles.heading2}>Glad to see you!</Text>

                    </View>
                    <View style={styles.inputData}>
                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Email Address'
                                placeholderTextColor="#fff"
                                value={state?.email}
                                onChangeText={(value) => onHandleChange(value, 'email')}
                            />
                        </View>

                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor="#fff"
                                value={state?.password}
                                onChangeText={(value) => onHandleChange(value, 'password')}
                                secureTextEntry
                            />
                        </View>


                    </View>
                    <Pressable> <Text style={styles.forgotPassword} >Forgot Password?</Text></Pressable>

                    <TouchableOpacity style={styles.loginBox} onPress={() => onLogin()}>
                        <Text style={styles.login} >Login</Text>
                    </TouchableOpacity>

                    <View style={styles.divideSection}>
                        <View style={styles.divideLine}></View>
                        <Text style={styles.dividetext}>Or Login with</Text>
                        <View style={styles.divideLine}></View>
                    </View>

                    <Pressable style={styles.anotherWaysToLoginBox}>

                        <View style={styles.googleFacebookBox}>
                            <View style={styles.googlefacebookBtn} >
                                <Image
                                    source={require('../../assests/images/google.png')}
                                    style={styles.googleFacebookLogo}

                                />
                            </View>
                            <View style={styles.googlefacebookBtn}>
                                <Image
                                    source={require('../../assests/images/Facebook.png')}
                                    style={styles.googleFacebookLogo}
                                />
                            </View>
                        </View>

                        <Pressable style={styles.signUpBox}>
                            <Text style={styles.lastRowText}>Dont't have an account? <Text style={styles.signUp} onPress={() => navigation.navigate("SignUp")}>Sign Up Now</Text></Text>
                        </Pressable>

                    </Pressable>

                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

export default LoginScreen
