 import React from 'react';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { View } from 'react-native';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import DrawerStarted from './components/DrawerStarted';
 const Drawer = createDrawerNavigator();
 const Stack = createNativeStackNavigator();
 const App = () => {
   return (
    <View style={{flex:1}}>
      <DrawerStarted/>
    </View>
     
   );
 }
 
 export default App;
 