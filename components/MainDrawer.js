import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStack from './MainStack';
const Drawer = createDrawerNavigator();
function MainDrawer(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown:false}}>
                <Drawer.Screen name="Main" component={MainStack}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default MainDrawer;