import React from 'react';
import { 
    View,
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CarsScreen from '../screens/CarsScreen';
import StackProfile from './StackProfile';
import TabBottom from './TabBottom';
const Drawer = createDrawerNavigator();
function DrawerProfile({props,route}) {
    return (
        
            <Drawer.Navigator screenOptions={{headerShown:false}}>
                <Drawer.Screen name="StackProfile" component={StackProfile} options={{title:"chinh"}}/>
            </Drawer.Navigator>
        
    );
}

export default DrawerProfile;