import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DrawerProfile from './DrawerProfile';
import UserProfile from '../screens/UserProfile';
const Stack = createNativeStackNavigator();
const StackStarted = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Profile" component={DrawerProfile}/> 
            <Stack.Screen name="Userprofile" component={UserProfile}/>        
        </Stack.Navigator>
    );
}

export default StackStarted;