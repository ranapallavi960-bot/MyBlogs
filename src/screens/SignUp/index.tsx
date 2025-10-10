import React from 'react'
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setInputValues, setPassword } from '../../store/slices/blogSlice'



const SignUpScreen = () => {

    const state = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const navigation = useNavigation()
    const signUpTestFn = () => {
        // Alert.alert("Signup pressed")
        auth().createUserWithEmailAndPassword(state.email, state.password).then(() => {
            Alert.alert("User Created")
          
            
        }).catch((error) => {
            // console.log(error.code)
            // Alert.alert("error Created")
            // console.log("Signup Error Code:", error.code)
            // console.log("Signup Error Message:", error.message)
            Alert.alert("Error: " + error.code)
        })
    }
    const onHandleChange = (value, field) => {
        console.log("field : ", field)
        console.log("value : ", value)

        dispatch(setInputValues({ [field]: value }))
    }
    console.log("hello")
    const onSignUp = () => {
        signUpTestFn()
        // navigation.navigate("BottomTabs")
        
        
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
                                placeholder='Email Address'
                                placeholderTextColor="#fff"
                                value={state?.email}
                                onChangeText={(value) => onHandleChange(value, "email")}
                            />
                        </View>

                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor="#fff"
                                value={state?.password}
                                onChangeText={(value) => onHandleChange(value, "password")}
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.emailPasswordBox}>
                            <TextInput
                                placeholder='Confirm Password'
                                placeholderTextColor="#fff"
                                value={state?.confirmPassword}
                                onChangeText={(value) => onHandleChange(value, "confirmPassword")}
                                secureTextEntry
                            />
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
                            <Text style={styles.lastRowText}>Already have an account? <Text style={styles.logIn} onPress={() => navigation.navigate("Login")} >Login Now</Text></Text>
                        </Pressable>

                    </Pressable>

                </View>

            </LinearGradient>
        </SafeAreaView>
    )
}

export default SignUpScreen

