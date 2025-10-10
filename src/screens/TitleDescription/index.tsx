import React from 'react'
import { View } from 'react-native'
import TitleDescriptionComponent from '../../Components/TitleDescriptionComponent'
import { SafeAreaView } from 'react-native-safe-area-context'

const TitleDescription = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <TitleDescriptionComponent/>
    </SafeAreaView>
  )
}

export default TitleDescription
