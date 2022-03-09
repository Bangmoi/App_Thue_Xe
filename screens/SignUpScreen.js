import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {API_URL} from '@env';

const SignUpScreen = ({navigation}) => {
    const [data,setData] = useState({
        username:'',
        password:'',
        passwordconfirm:'',
        check_textInputChange:false,
        secureTextEntry:true,
        secureTextEntryconfirm:true,
        isValidUser: false,
        isValidPassword: false,
        isValidPasswordConfirm: false,
        checkpassword:true,
        checkpasswordconfirm:true,   
        comparepassword:true 
    });
    const API= {API_URL}; 
    const textInputChange = (val) => {
        if( val.trim().length >= 5 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const handlePasswordConfirmChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                passwordconfirm: val,
                isValidPasswordConfirm: true
            });
        } else {
            setData({
                ...data,
                passwordconfirm: val,
                isValidPasswordConfirm: false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    const updateSecureTextConfirmEntry = () => {
        setData({
            ...data,
            secureTextEntryconfirm: !data.secureTextEntryconfirm
        });
    }
    const CreateAccount=()=>{
        if(data.password===data.passwordconfirm&&data.username.trim().length>=5&&data.password.trim().length>7){
            setData({
                ...data,
                comparepassword:true
            });
            fetch(API.API_URL+'register.php', {
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
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson==='Register success'){
                    //Alert.alert("Đăng ký thành công!");
                    Alert.alert("Đăng ký thành công!","Đăng nhập ngay!",[{text:"OK",onPress:()=>{navigation.navigate('SignIn')}}])
                }
                else {
                    Alert.alert("Đăng ký thất bại tài khoản đã có người sử dụng!");
                }
                console.log(responseJson);
            })
            .catch((error)=>{console.log(error);});
        }
        else{
            setData({
                ...data,
                comparepassword:false
            })
        }
    }
    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#08d4c4"
                hidden={true} />
            <View style={styles.header}>
                <Text style={styles.text_header}>Cùng Tạo Tài Khoản Mới!</Text>
            </View>
            <Animatable.View style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.text_footer}>Đăng Ký</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Tên Đăng Ký"
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

                {/* //Mật khẩu */}
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
                            <Text style={{fontSize:16,color:"red"}}>Mật khẩu phải lớn hơn 8 kí tự!</Text>
                        </View>}
                {/* Xác nhận mật khẩu */}
                <View style={styles.action}>
                    <FontAwesome 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Nhập Lại Mật khẩu"
                        secureTextEntry={data.secureTextEntryconfirm ? true: false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=>handlePasswordConfirmChange(val)}
                        onEndEditing={()=>{
                            if(data.passwordconfirm.trim().length>8){
                                setData({
                            ...data,
                            checkpasswordconfirm:true
                            })
                            }
                            else{
                                setData({
                            ...data,
                            checkpasswordconfirm:false
                            })
                            }
                        }}
                    />
                     <TouchableOpacity
                    onPress={updateSecureTextConfirmEntry}
                    >
                    {data.secureTextEntryconfirm ? 
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
                    {data.checkpasswordconfirm?null:
                            <View style={{justifyContent:'center',alignItems:"center",marginTop:10}}>
                                <Text style={{fontSize:16,color:"red"}}>Mật khẩu phải lớn hơn 8 kí tự!</Text>
                            </View>}
                    {data.comparepassword?null:
                        <View style={{justifyContent:'center',alignItems:"center",marginTop:10}}>
                            <Text style={{fontSize:16,color:"red"}}>Vui lòng kiểm tra lại mật khẩu!</Text>
                        </View>}
                <View style={styles.button}>
                {data.isValidUser===true&&data.isValidPassword===true&&data.isValidPasswordConfirm===true?
                        <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.signIn,{
                                borderColor:'#009387',
                                borderWidth:1,
                                marginTop:20,
                                backgroundColor:'#01ab9d',
                            }]}
                            onPress={CreateAccount}
                        >
                            <Text style={[styles.textSign,{color:'#fff'}]}>Đăng Ký</Text>
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
                            onPress={CreateAccount}
                            disabled={true}
                        >
                            <Text style={[styles.textSign,{color:'#fff'}]}>Đăng Ký</Text>
                        </TouchableOpacity>
                    }
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignIn')}
                            style={[styles.signIn,{
                                borderColor:'#009387',
                                borderWidth:1,
                                marginTop:20,
                            }]}
                        >
                            <Text style={[styles.textSign,{color:'#009387'}]}>Đăng Nhập</Text>
                        </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignUpScreen;

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
        alignItems:'center'
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
