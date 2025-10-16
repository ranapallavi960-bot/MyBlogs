import React from 'react'
import { Stack } from './navigation.config'
import BottomTabNavigation from './BottomTabNavigation'
import TitleDescription from '../screens/TitleDescription'

const MainNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="BottomTabs"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="BottomTabs"
                component={BottomTabNavigation} />
            <Stack.Screen
                name="TitleDescription"
                component={TitleDescription} />
        </Stack.Navigator>
    )
}

export default MainNavigation
