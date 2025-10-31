import React from 'react'
import { Stack } from './navigation.config'
import BottomTabNavigation from './BottomTabNavigation'
import TitleDescription from '../screens/TitleDescription'
import EditProfileScreen from '../screens/EditProfile'
import UserDetailScreen from '../screens/UserDetail'

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
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen} />
            
        </Stack.Navigator>
    )
}

export default MainNavigation
