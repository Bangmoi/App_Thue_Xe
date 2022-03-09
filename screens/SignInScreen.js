import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import { CheckBox } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import DrawerProfile from '../components/DrawerProfile';
const SignInScreen = ({props,navigation}) => {
    const [data,setData] = useState({
        username:'',
        password:'',
        check_textInputChange:false,
        secureTextEntry:true,
        checkLength:false,
        isValidUser:false,
        isValidPassword:false,
        name:"",
        loginSuccess:true,
        checkusername:true,
        checkpassword:true,
    });
    const API= {API_URL}; 
    const [checked, setChecked] = useState(false);
    const [info, setInfo] = useState({});
    const textInputChange = (val) => {
        if( val.trim().length >= 5 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
                checkLength:true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
                checkLength:false
            });
        }
    }
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true,
                checkLength:true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
                checkLength:false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const Savetoken=async(token)=>{
        if(checked===true){
            try {
                await AsyncStorage.setItem("@Login:token",token);
                console.log(await AsyncStorage.getItem("@Login:token"));
                await AsyncStorage.setItem("@Login:username",data.username);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await AsyncStorage.setItem("@Login:username",data.username);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const Login=()=>{
        if(data.username.trim().length>4 && data.password.trim().length>7){
            fetch(API.API_URL+'login.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   'username': data.username,
                   'password': data.password,
                })
            })
            .then((response)=>response.json())
            .then(async(responseJson)=>{
                console.log(responseJson);
                if(responseJson.message==='Login success'){
                    await AsyncStorage.setItem("@Login:id_username",responseJson.info.id);
                    console.log(responseJson);
                    Savetoken(responseJson.token);
                    setInfo(responseJson.info);
                    navigation.navigate('Profile');
            }
                else {
                    //Alert.alert("Tài khoản hoặc mật khẩu không chính xác");
                    setData({
                        ...data,
                        loginSuccess:false
                    })
                }
                //console.log(responseJson);
            })
            .catch((error)=>{console.log(error);});
        }
        else Alert.alert("Tài khoản hoặc mật khẩu không hợp lệ");

    }
    //console.log(data.username);
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#08d4c4"
                hidden={true} />
            <View style={styles.header}>
                <Text style={styles.text_header}>Hãy Đăng Nhập!</Text>
            </View>
            <Animatable.View style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.text_footer}>Đăng Nhập</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Tên Đăng Nhập"
                        style={[styles.textInput,{paddingLeft:13}]}
                        autoCapitalize="none"
                        onChangeText={(val)=>textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                    </Animatable.View>
               
                : 
                <Animatable.View
                    animation="wobble"
                >
                <Feather 
                        name="x-circle"
                        color="red"
                        size={20}
                    />
                    </Animatable.View>
                    }
                     
                </View>
                <View style={styles.action}>
                    <FontAwesome 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Mật khẩu"
                        secureTextEntry={data.secureTextEntry ? true: false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>handlePasswordChange(val)}
                        onEndEditing={()=>{
                            if(data.password.trim().length>8){
                                setData({
                            ...data,
                            checkpassword:true
                            })
                            }
                            else{
                                setData({
                            ...data,
                            checkpassword:false
                            })
                            }
                        }}
                    />
                     <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
                </View>
                {data.checkpassword?null:
                    <View style={{justifyContent:'center',alignItems:"center",marginTop:10}}>
                        <Text style={{fontSize:16,color:"red"}}>Mật khẩu không chính xác!</Text>
                    </View>}
                <View style={{height:60,width:'100%',marginTop:20,marginLeft:-24}}>
                {checked?
                    <CheckBox
                        title='Nhớ mật khẩu'
                        checked={checked}
                        onPress={()=>setChecked(!checked)}
                        checkedColor={'#009387'}
                        size={26}
                        textStyle={{color:'#333',fontWeight:'500',fontSize:16}}
                        containerStyle={{backgroundColor:'#fff',borderWidth:0}}
                    />
                    :
                    <CheckBox
                        title='Nhớ mật khẩu'
                        checked={checked}
                        onPress={()=>setChecked(!checked)}
                        checkedColor={'#009387'}
                        size={26}
                        textStyle={{color:'#999',fontWeight:'500',fontSize:16}}
                        containerStyle={{backgroundColor:'#fff',borderWidth:0}}
                    />
                }
                </View>
                {data.loginSuccess?null
                :
                <View style={{justifyContent:'center',alignItems:"center"}}>
                    <Text style={{fontSize:16,color:"red"}}>Tài khoản hoặc mật khẩu không chính xác!</Text>
                </View>}
                
                <View style={styles.button}>
                    {data.isValidUser===true&&data.isValidPassword===true?
                        <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.signIn,{
                                borderColor:'#009387',
                                borderWidth:1,
                                marginTop:20,
                                backgroundColor:'#01ab9d',
                            }]}
                            onPress={Login}
                        >
                            <Text style={[styles.textSign,{color:'#fff'}]}>Đăng Nhập</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.signIn,{
                                borderColor:'#009387',
                                borderWidth:1,
                                marginTop:20,
                                backgroundColor:'#01ab9d',
                                opacity:0.5
                            }]}
                            onPress={Login} 
                            disabled={true}
                        >
                            <Text style={[styles.textSign,{color:'#fff'}]}>Đăng Nhập</Text>
                        </TouchableOpacity>
                    }
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                            style={[styles.signIn,{
                                borderColor:'#009387',
                                borderWidth:1,
                                marginTop:20,
                            }]}
                        >
                            <Text style={[styles.textSign,{color:'#009387'}]}>Đăng Ký</Text>
                        </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        alignItems:'center',
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
        fontSize:20,
        marginBottom:-10,
        textDecorationLine:'none',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    checkbox: {
        alignSelf: "center",
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
