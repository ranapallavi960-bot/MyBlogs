import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import TitleDescriptionCard from '../../Components/TitleDescriptionCard'
import firestore from '@react-native-firebase/firestore';

 
const HomeScreen = () => {

  const [blogS, setBlogS] = useState<BlogType[]>([])
  const navigation = useNavigation();

  console.log(JSON.stringify(blogS, null, 5))
  useEffect(() => {
    const subscriber = firestore()
      .collection('blogs')
      .onSnapshot((querySnapshot:any) => {
        const blogList: BlogType[] = [];

        querySnapshot.forEach((documentSnapshot:any) => {
          blogList.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });

        setBlogS(blogList.reverse());
        // getData()
      });

    return () => subscriber();
  }, [])

console.log("====",blogS)

  return (
    <SafeAreaView style={styles.container}>
      {/* <ActivityIndicator/> */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assests/images/splash.png")}
          style={styles.appLogo}
        />
        <Pressable onPress={() => navigation.navigate("TitleDescription" as never)}>
          <Image
            source={require("../../assests/images/add.png")}
            style={styles.add}
          />
        </Pressable>
      </View>


      <FlatList
        data={blogS}
        // onRefresh={}
        renderItem={({ item }) => (
          <TitleDescriptionCard
            name={item?.name}
            title={item?.title}
            image={item?.image}
            description={item?.description}
            id={item?.id}
            likes={item?.likes}
          />
        )}
      />

    </SafeAreaView>
  )
}

export default HomeScreen
