import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin } from '../../store/slices/blogSlice'
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'

const AnimatedPressable= Animated.createAnimatedComponent(Pressable)


const LoginSignUpScreen = () => {
    const navigation = useNavigation();
    const state = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#b4a7d6', '#9fc5e8']} style={{ flex: 1 }}>
                <View style={styles.containerContent}>

                    <Animated.Image
                        style={styles.splashImage}
                        entering={FadeIn.duration(500)}
                        source={require('../../assests/images/splash.png')}

                    />
                    <Text style={styles.heading}>MyBlogs</Text>
                    <View style={styles.loginSignUpBox}>
                        <AnimatedPressable 
                        style={!state.isLogin ? styles.activeBtn : styles.loginSignUpBtn} 
                        entering={FadeIn.duration(500)}
                         onPress={() => dispatch(setIsLogin(false),
                                 navigation.navigate("Login")) }
                        >
                            <Text
                                style={styles.loginSignUpText}
                               
                            >Login</Text>
                        </AnimatedPressable>
                        <AnimatedPressable 
                        onPress={() => dispatch(setIsLogin(true),
                                 navigation.navigate("SignUp"))
                                }
                        entering={FadeIn.duration(500)}
                        style={state.isLogin ? styles.activeBtn : styles.loginSignUpBtn}>
                            <Text
                                style={styles.loginSignUpText}
                                
                            >Sign Up</Text>
                        </AnimatedPressable>
                    </View>
                </View>


            </LinearGradient>
        </SafeAreaView>
    )
}

export default LoginSignUpScreen

const styles = StyleSheet.create({
    container: {

        flex: 1,

    },
    containerContent: {

        justifyContent: "center",

        flex: 1,
        paddingHorizontal: 20

    },
    splashImage: {
        width: Dimensions.get('screen').width * 0.30,
        height: Dimensions.get('screen').width * 0.30,
        alignSelf: "center"

    },
    heading: {
        color: "#073763",
        fontSize: 50,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 50

    },
    loginSignUpBox: {
        gap: 10,

    },
    signUp: {},
    loginSignUpBtn: {

        padding: 13,
        borderRadius: 10,
        width: "100%",
        borderWidth: 1,
        borderColor: "#fff"

    },
    loginSignUpText: {
        alignSelf: "center"
    },
    activeBtn: {
        backgroundColor: '#fff',
        padding: 13,
        borderRadius: 10,
        width: "100%"
    }

})