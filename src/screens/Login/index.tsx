import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { setInputValues, setIsLogin } from '../../store/slices/blogSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const state = useSelector((state: any) => state.blogs)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [visible, setVisible] = useState(true)

    const loginWithEmailPassword = async () => {
        try {
            console.log("state:", state);
            const result = await auth().signInWithEmailAndPassword(state.email, state.password);
            console.log("result:", result);
            const user = result.user;
            const token = await user.getIdToken();
            await AsyncStorage.setItem('token', token)
            dispatch(setIsLogin(true))
            console.log("Firebase ID Token:", token);
            navigation.navigate("BottomTabs" as never);

        } catch (error: any) {
            console.log("Login error:", error);
            Alert.alert(error.message);
        }
    };

    const onHandleChange = (value: any, field: any) => {
        console.log("field : ", field)
        console.log("value : ", value)

        dispatch(setInputValues({ [field]: value }))
    }
    const onLogin = () => {
        loginWithEmailPassword()

    }
    const togglePasswordVisibility = () => {
        setVisible(!visible);
    };


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
                            <View style={styles.inputPassword}>
                                <TextInput
                                    placeholder='Password'
                                    placeholderTextColor="#fff"
                                    value={state?.password}
                                    onChangeText={(value) => onHandleChange(value, 'password')}
                                    secureTextEntry={visible}   // ← hide/show works here
                                   
                                />
                            </View>

                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <Image
                                    source={
                                        visible
                                            ? require("../../assests/images/hide.png")  // when hidden
                                            : require("../../assests/images/show.png")  // when visible
                                    }
                                    style={styles.passwordShowHideIcon}
                                />
                            </TouchableOpacity>
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
                            <Text style={styles.lastRowText}>Dont't have an account? <Text style={styles.signUp} onPress={() => navigation.navigate("SignUp" as never)}>Sign Up Now</Text></Text>
                        </Pressable>

                    </Pressable>

                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

export default LoginScreen
