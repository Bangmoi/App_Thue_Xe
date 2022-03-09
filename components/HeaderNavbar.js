import React, { useEffect, useState } from 'react';
import { 
    View,
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import EditProfileScreen from '../screens/EditProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import { useNavigation } from '@react-navigation/core';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import user from '../assets/user.png';
import menu from '../assets/menu.png';
function HeaderNavbar(props){
    const navigation= useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            autoFetchInfo();
          });
          return unsubscribe;
      },[3000])
     const API= {API_URL}; 
     const [info, setInfo] = useState([]);
     //const [search, setsearch] = useState("");
        const autoFetchInfo= async()=>{ 
          const value = await AsyncStorage.getItem("@Login:username");
          fetch(API.API_URL+'autoinfo.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'username': value,
            })
        })
          .then((response)=>response.json())
          .then((responseJson)=>{
              setInfo(responseJson);console.log(1);
          })
        .catch((error)=>{console.log(error);});
        }
        
    return(
        
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#08d4c4"
                    hidden={true} />
               <View style={styles.navbar__header}>
                <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
                    <View style={styles.listBars} >
                        <Image source={require('../assets/xengaylogo.png')} style={{height:80 ,width:80}}/>
                    </View> 
                </TouchableOpacity>
                <View style={styles.navbar__search}>
                <TextInput
                    //onChange={props.onChange}
                    style={styles.textInput}
                    value={props.value}
                    iconClass={FontAwesomeIcon}
                    inlineImageLeft="search"
                    inlineImagePadding={2}
                    underlineColorAndroid="transparent"
                    placeholder="Tìm kiếm..."
                    onChangeText={props.onChangeText} 
                    //onEndEditing={props.onEndEditing}
                    //onPressIn={props.onPressIn}
                    //clearButtonMode='while-editing'
                />
                {/* <TouchableOpacity style={styles.icon__search}>
                    <Feather
                        name="search"
                        color="#01ab9d"
                        size={25}
                    />
                </TouchableOpacity> */}
                </View>
                
                <TouchableOpacity onPress={()=>navigation.navigate("UserProfile")}>
                    <View style={styles.listBars} >
                        <Image source={menu} style={{height:34 ,width:34}}/>
                    </View> 
                </TouchableOpacity>

               </View>
            </View>

        
    );
};

export default HeaderNavbar;

const styles = StyleSheet.create({
    container:{
        //zIndex:5,
        height:68,
        backgroundColor:"#01ab9d",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },  
    navbar__header:{
        width:'100%',
        height:'80%',
        justifyContent:'space-evenly',
        flexDirection:'row',
        alignItems:'center', 
    },
    textInput: {
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 14,
        color: '#01ab9d',
        backgroundColor:'#fff',
        height:35,
        borderRadius:5,
        paddingRight:40
    },
    navbar__search:{
        flex:0.8,
        position:'relative',
        justifyContent:'center',
        marginLeft:-8,
        top:5
    },
    icon__search:{
        position:'absolute',
        top:-6,
        right:'2%'
    },
    listBars:{
        alignItems:'flex-end',
        justifyContent:'center',
        alignItems:'center',
        width:50,
    },
    logo:{
        width:80,
        height:80,
        position:'absolute'
    }
})
