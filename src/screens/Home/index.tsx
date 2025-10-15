import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import TitleDescriptionCard from '../../Components/TitleDescriptionCard'

import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth'


const blogData = [
  {
    key: 1,
    name: "Pallavi Rana",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj  hjdfsdufhsidufhsiufhiurfh  jcasdiuj uhdw wdiwd ihidwewifj  idiewi  "
  },
  {
    key: 2,  
    name: "Komal Rana",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj "
  },
  {
    key: 3,   
    name: "Nancy Rana",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj "
  },
  {
    key: 4,
    name: " Jaskaran Singh",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj "
  },
  {
    key: 5,
    name: "Bandna Kumari",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj "
  },
  {
    key: 6,
    name: "Kushal Kumar",
    title: "My First Blog",
    description: "hello everyone , this is my first blog and i am very glad jdjvjdnsjdkcnsjkdndkjvnkjvnjdvnv jsdn jnskj nnn kakkkk kcnsk nkjfnkjen gjng jnnkjvnskjfnkjnvavk sdvn skjfkj "
  },
]

const HomeScreen = () => {

const [blogS,setBlogS]=useState([])
  const navigation = useNavigation();

  const handleBlogCollection=async()=>{
    try {
       const blogsCollection = firestore().collection('blogs');
       const result =await blogsCollection.get();
       console.log("result",result)
    } catch (error) {
      console.log("Blog fetch error: ",error)
    }
  };

  const addBlog=()=>{
    firestore().collection("blogs").add({
      name:"Rahul",
      title:"My 4th Blog",
      description:"jjdsfvdjsnvjidfnvjcvjsdfisfdsknvdskjvndfsjghisuhfidsnckjn  jnjdn gi ifwifj iafj iwof"
    })
  }
  useEffect(()=>{
    handleBlogCollection()
     const subscriber = firestore()
    .collection('blogs')
    .onSnapshot(querySnapshot => {
      const blogS = [];

      querySnapshot.forEach(documentSnapshot => {
        blogS.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setBlogS(blogS);
     
    });
  return () => subscriber();
  },[])

  return (
    <SafeAreaView style={styles.container}>
      {/* <ActivityIndicator/> */}
      <LinearGradient colors={['#b4a7d6', '#9fc5e8']}>
       
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assests/images/splash.png")}
            style={styles.appLogo}
          />
          <Pressable onPress={() => navigation.navigate("TitleDescription")}>
            <Image
              source={require("../../assests/images/add.png")}
              style={styles.add}
            />
          </Pressable>
        </View>
      </LinearGradient>
      
      <FlatList
        data={blogS}
        renderItem={({ item }) => (
          <TitleDescriptionCard
            name={item.name}
            title={item.title}
            description={item.description}
          />
        )}
      />

    </SafeAreaView>
  )
}

export default HomeScreen
