import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HeaderNavbar from './HeaderNavbar';
import UserProfile from '../screens/UserProfile';
import TabBottom from './TabBottom';
import ContactInfo from '../screens/ContactInfo';
import IntroduceInfo from '../screens/IntroduceInfo';
import PrivateInfo from '../screens/PrivateInfo';
import DescriptionScreen from '../screens/DescriptionScreen';
import MotorCycleScreen from '../screens/MotorCycleScreen';
import Card from './Card';
const Stack = createNativeStackNavigator();
function StackProfile(props) {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen options={{headerShown:false}} name="tab" component={TabBottom} />   
            <Stack.Screen options={{headerShown:false}} name="header" component={HeaderNavbar} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{title:"Trang cá nhân"}}/>
            <Stack.Screen name="ContactInfo" component={ContactInfo} options={{title:"Liên lạc",headerShown:true}}/>
            <Stack.Screen name="IntroduceInfo" component={IntroduceInfo} options={{title:"Giới thiệu",headerShown:true}}/>
            <Stack.Screen name="PrivateInfo" component={PrivateInfo} options={{title:"Riêng tư",headerShown:true}}/>
            <Stack.Screen name="Description" component={DescriptionScreen} options={{title:"Thông tin sản phẩm",headerShown:true}}/>
            {/* <Stack.Screen name="MotorCycle" component={MotorCycleScreen} options={{title:"Xe máy"}}/> */}
        </Stack.Navigator>
    );
}

export default StackProfile;