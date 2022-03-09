import React,{useState} from 'react';
import { View,Text,TouchableOpacity,KeyboardAvoidingView, StyleSheet, ScrollView,Alert } from 'react-native';
import MyTextInput from '../components/MyTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
function PrivateInfo({props,route}) {
    const [data, setData] = useState({
        CMND:"",
        checkCMND:false,
        API_URL:route.params.API_URL,
        CMNDOrigin:route.params.CMND,
        check_Success:false
      });
    const handleIdentityChange = (val) => {
        if(val.length>=6&&val.length<=18) {
            setData({
                ...data,
                CMND: val,
                checkCMND: true,
            })
        } else {
            setData({
                ...data,
                CMND: val,
                checkCMND: false
            })
        }
    }
    const UpdateIdentity=async()=>{
        const value = await AsyncStorage.getItem("@Login:username");
        fetch(data.API_URL+'UpdateIdentity.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'CMND': data.CMND,
               'username':value
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson==='Update success'){
                setData({
                    ...data,
                    check_Success:true
                });
            }
            else {
                Alert.alert("Cập nhật thất bại!");
            }
            console.log(responseJson);
        })
        .catch((error)=>{console.log(error);});
    }
    return (
        <View style={styles.container}>
             <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}  enabled keyboardVerticalOffset={4}>
              <ScrollView style={{height:"100%"}}>
              <View>
                <View style={styles.mTextinput}>
                {data.CMNDOrigin==""?
                    <MyTextInput label={"CMND/CCCD"}
                        keyboardType = 'number-pad'
                        onChangeText ={(val)=>handleIdentityChange(val)}
                        value= {data.CMND}
                        placeholder="VD:022..."
                    />
                :   
                    <MyTextInput label={"CMND/CCCD"}
                        keyboardType = 'number-pad'
                        onChangeText ={(val)=>handleIdentityChange(val)}
                        value= {data.CMND}
                        placeholder={data.CMNDOrigin}
                    />
                }
                </View>
                <View style={{justifyContent:'center',alignItems:'center',height:60,width:"100%"}}>
                            {data.check_Success?
                            <Text style={styles.warning}>Cập nhật thành công!</Text>
                            :null}
                </View>
                {data.checkCMND?
                <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.update,{
                                borderColor:'#009387',
                                borderWidth:1,
                                backgroundColor:'#01ab9d',
                            }]}
                            onPress={()=>UpdateIdentity()}
                        >
                            <Text style={[styles.textUpdate,{color:'#fff'}]}>Cập nhật</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.update,{
                                borderColor:'#009387',
                                borderWidth:1,
                                backgroundColor:'#01ab9d',
                                opacity:0.5
                            }]}
                            disabled={true}
                        >
                            <Text style={[styles.textUpdate,{color:'#fff'}]}>Cập nhật</Text>
                </TouchableOpacity>
                }
              </View>
              </ScrollView>
              </KeyboardAvoidingView>
        </View>
    );
}

export default PrivateInfo;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    warning:{
        color:"#08d4c4",
        fontSize:26,
        fontWeight:"300",
        marginLeft:26,
        position:"absolute",
        top:60
      },
    mTextinput:{
        width:"100%",
        marginTop:10,
    },
    update: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft:20,
        marginRight:20,
        marginTop:60,
    },
    textUpdate: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})