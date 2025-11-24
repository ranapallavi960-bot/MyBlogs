import React, { useState } from 'react'
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setInputValues, setIsLogin, setPassword } from '../../store/slices/blogSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';



const SignUpScreen = () => {

    const state = useSelector((state: any) => state.blogs)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const signUpTestFn = async () => {
        if (!state.email || !state.password || !state.confirmPassword) {
            Alert.alert("Error", "Please fill all fields!");
            return;
        }
        if (state.password !== state.confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }

        try {
            // Firebase Authentication
            const result = await auth().createUserWithEmailAndPassword(state.email, state.password);
            const user = result.user;
            const token = await user.getIdToken();
            await AsyncStorage.setItem('token', token);

            // ✅ Firestore me user details add karo UID ke sath
            await firestore().collection("users").doc(user.uid).set({
                name: state.name,
                email: state.email,
                uid: user.uid,
                token: token,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

            dispatch(setIsLogin(true));
            dispatch(setInputValues({
                email: '',
                password: '',
                confirmPassword: '',
                name: ''
            }));

            Alert.alert("Success", "User Created Successfully!");
            console.log("User UID:", user.uid);
            console.log("User Token:", token);

        } catch (error: any) {
            console.log("Signup Error:", error);
            Alert.alert("Error: " + error.code);
        }
    };


    // const addUserDetails = (token) => {
    //     firestore().collection("users").add({
    //         name: state.name,
    //         email: state.email,
    //         token
    //     })
    // }

    const onHandleChange = (value: string, field: string) => {
        console.log("field : ", field)
        console.log("value : ", value)
        dispatch(setInputValues({ [field]: value }))
    }
    console.log("hello")
    const onSignUp = () => {
        signUpTestFn()

    }
  

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#b4a7d6', '#9fc5e8']} style={{ flex: 1 }}>

                <View style={styles.containerData}>
                    <View style={styles.headingBox}>
                        <Text style={styles.heading1Line1}>Create Account</Text>
                        <Text style={styles.heading1Lie2}>to get started now</Text>

                    </View>
                    <View style={styles.inputData}>
                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Enter Name'
                                placeholderTextColor="#fff"
                                value={state?.name}
                                onChangeText={(value) => onHandleChange(value, "name")}
                            />
                        </View>

                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Email Address'
                                placeholderTextColor="#fff"
                                value={state?.email}
                                onChangeText={(value) => onHandleChange(value, "email")}
                            />
                        </View>

                        <View style={styles.emailPasswordBox}>
                            <View style={styles.inputPassword}>
                                <TextInput
                                    placeholder='Password'
                                    placeholderTextColor="#fff"
                                    value={state?.password}
                                    onChangeText={(value) => onHandleChange(value, 'password')}
                                    secureTextEntry={!showPassword}

                                />
                            </View>

                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    source={
                                        showPassword
                                            ? require("../../assests/images/show.png")
                                            : require("../../assests/images/hide.png")
                                    }
                                    style={styles.passwordShowHideIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.emailPasswordBox}>
                            <View style={styles.inputPassword}>
                                <TextInput
                                    placeholder='Confirm Password'
                                    placeholderTextColor="#fff"
                                    value={state?.confirmPassword}
                                    onChangeText={(value) => onHandleChange(value, 'confirmPassword')}
                                    secureTextEntry={!showConfirmPassword}

                                />
                            </View>

                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Image
                                    source={
                                        showConfirmPassword
                                            ? require("../../assests/images/show.png")
                                            : require("../../assests/images/hide.png")
                                    }
                                    style={styles.passwordShowHideIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.signUpBox} onPress={() => onSignUp()}>
                        <Text style={styles.signUp}  >Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.divideSection}>
                        <View style={styles.divideLine}></View>
                        <Text style={styles.dividetext}>Or Sign Up with</Text>
                        <View style={styles.divideLine}></View>
                    </View>

                    <Pressable style={styles.anotherWaysToSignUpBox}>

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

                        <Pressable style={styles.loginBox}>
                            <Text style={styles.lastRowText}>Already have an account? <Text style={styles.logIn} onPress={() => navigation.navigate("Login" as never)} >Login Now</Text></Text>
                        </Pressable>

                    </Pressable>

                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUpScreen

