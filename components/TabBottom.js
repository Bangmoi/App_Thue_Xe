import * as React from 'react';
import { 
    View,
    StyleSheet ,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import CarsScreen from '../screens/CarsScreen';
import MotorCycleScreen from '../screens/MotorCycleScreen';
import BicycleScreen from '../screens/BicycleScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../screens/UserProfile';
const Tab =createBottomTabNavigator();

function TabBottom({navigation}){
    return(
        <Tab.Navigator
        screenOptions={{
            showLabel:false,
            headerShown:false,
            tabBarStyle:{
                height:60,
                position:'absolute',
                keyboardHidesTabBar: true,
            }
            }}>
            <Tab.Screen options={{
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon}>
                        <FontAwesome
                            name='home'
                            size={30}
                            color={focused ? '#08d4c4' : '#999'}
                        />
                    </View>
                )
            }} name="Home" component={HomeScreen} />
            <Tab.Screen options={{
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon}>
                        <FontAwesome
                            name='car'
                            size={30}
                            color={focused ? '#08d4c4' : '#999'}
                        />
                    </View>
                )
            }} name="Car" component={CarsScreen} />
            <Tab.Screen options={{
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon}>
                        <FontAwesome
                            name='motorcycle'
                            size={30}
                            color={focused ? '#08d4c4' : '#999'}
                        />
                    </View>
                )
            }} name="Motor" component={MotorCycleScreen} />
            <Tab.Screen options={{
                tabBarShowLabel:false,
                tabBarIcon:({focused})=>(
                    <View style={styles.icon}>
                        <FontAwesome
                            name='bicycle'
                            size={30}
                            color={focused ? '#08d4c4' : '#999'}
                        />
                    </View>
                )
            }} name="Bicycle" component={BicycleScreen} />
        </Tab.Navigator> 
    );
}

export default  TabBottom; 

const styles = StyleSheet.create({
    tabBottom:{

    },
    icon:{
        position:'absolute',
        justifyContent:'space-evenly',

    }
})