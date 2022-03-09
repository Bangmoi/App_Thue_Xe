import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackStarted from './StackStarted';
import TabBottom from './TabBottom';
import CarsScreen from '../screens/CarsScreen';
const Drawer = createDrawerNavigator();
const DrawerStarted=()=> {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown:false}}>
                <Drawer.Screen name="StackStarted" component={StackStarted}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerStarted;