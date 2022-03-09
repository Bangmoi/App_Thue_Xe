import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerProfile from './DrawerProfile';
import DrawerStarted from './DrawerStarted';
const Stack = createNativeStackNavigator();
function MainStack(props) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Stated" component={DrawerStarted}/>
            <Stack.Screen name="Profile" component={DrawerProfile} />        
        </Stack.Navigator>
    );
}

export default MainStack;