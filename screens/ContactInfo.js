import React,{useState} from 'react';
import { View,Text,Image,TouchableOpacity,KeyboardAvoidingView, StyleSheet, ScrollView, Alert } from 'react-native';
import MyTextInput from '../components/MyTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ContactInfo({props,route}) {
    const [data, setData] = useState({
        email:"",
        address:"",
        phonenumber:"",
        check_phonenumber:true,
        check_address:false,
        check_email:false,
        check_email1:false,
        check_Success:false,
        API_URL:route.params.API_URL,
        emailOrigin:route.params.email,
        phoneOrigin:route.params.phonenumber,
        addressOrigin:route.params.address,
      });
      const handlePhoneNumberChange = (val) => {0
        var firstNumber = val.substring(0, 2);
        if((val.length>=9&&val.length<=12)&&(firstNumber==="08"||firstNumber==="09"||firstNumber==="01")&&!isNaN(val)) {
            setData({
                ...data,
                phonenumber: val,
                check_phonenumber: true,
                check_contact:true,
            });
        } else {
            setData({
                ...data,
                phonenumber: val,
                check_phonenumber: false
            });
        }
    }
    const handleEmailChange = (val) => {
        if(val.length>=6&&((val.search("@")!==-1)&&(val.search(".com")!==-1))) {
            setData({
                ...data,
                email: val,
                check_email: true,
                check_email1:false,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_email: false,
                check_email1:true,
            });
        }
    }
    const handleAddressChange = (val) => {
        if(val.length>=9) {
            setData({
                ...data,
                address: val,
                check_address: true,
            });
        } else {
            setData({
                ...data,
                address: val,
                check_address: false
            });
        }
    }
    const UpdateContact=async()=>{
        const value = await AsyncStorage.getItem("@Login:username");
        fetch(data.API_URL+'UpdateContact.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'email': data.email,
               'address': data.address,
               'phonenumber': data.phonenumber,
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
                {data.phoneOrigin==""?
                    <MyTextInput label={"Số điện thoại"} 
                        keyboardType = 'number-pad'
                        onChangeText ={(val)=>handlePhoneNumberChange(val)}
                        value= {data.phonenumber}
                        placeholder="Số điện thoại"
                    />
                  :
                      <MyTextInput label={"Số điện thoại"} 
                        keyboardType = 'number-pad'
                        onChangeText ={(val)=>handlePhoneNumberChange(val)}
                        value= {data.phonenumber}
                        placeholder={data.phoneOrigin}
                    />
                  }
                  {data.check_phonenumber?
                      null
                  :
                    <Text style={styles.warning}>Số điện thoại không đúng!</Text>
                  } 
                </View>
                <View style={styles.mTextinput}>
                {data.emailOrigin==""?
                    <MyTextInput label={"Email"}
                        onChangeText ={(val)=>handleEmailChange(val)}
                        value= {data.email}
                        placeholder="VD:example1102@gmail.com"
                    />
                  :
                    <MyTextInput label={"Email"}
                        onChangeText ={(val)=>handleEmailChange(val)}
                        value= {data.email}
                        placeholder={data.emailOrigin}
                    />
                }
                {!data.check_email?
                    <View>
                        {data.check_email1?
                        <Text style={styles.warningemail}>Chưa đúng định dạng VD: example@gmail.com</Text>
                        :
                        null}    
                    </View>
                :null
                }
                </View>
                <View style={styles.mTextinput}>
                {data.addressOrigin==""?
                  <MyTextInput label={"Địa chỉ"}
                    onChangeText ={(val)=>handleAddressChange(val)}
                      value= {data.address}
                      placeholder="Nhập địa chỉ"
                  />
                :
                    <MyTextInput label={"Địa chỉ"}
                        onChangeText ={(val)=>handleAddressChange(val)}
                        value= {data.address}
                        placeholder={data.addressOrigin}
                    />
                }
                </View>
                <View style={{justifyContent:'center',alignItems:'center',height:60,width:"100%"}}>
                            {data.check_Success?
                            <Text style={styles.warning1}>Cập nhật thành công!</Text>
                            :null}
                    </View>
                {data.check_address&&data.check_phonenumber&data.check_email?
                <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.update,{
                                borderColor:'#009387',
                                borderWidth:1,
                                backgroundColor:'#01ab9d',
                            }]}
                            onPress={()=>UpdateContact()}
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

export default ContactInfo;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    warning:{
        color:"#08d4c4",
        fontSize:16,
        fontWeight:"300",
        marginLeft:26,
        position:"absolute",
        top:60
    },
    warning1:{
        color:"#08d4c4",
        fontSize:26,
        fontWeight:"300",
    },
    warningemail:{
        color:"#08d4c4",
        fontSize:16,
        fontWeight:"300",
        marginLeft:26,
        position:"absolute",
        top:-8
    },
    mTextinput:{
        width:"100%",
        marginTop:10,
        marginBottom:10
    },
    update: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft:20,
        marginRight:20,
        marginTop:20,
    },
    textUpdate: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})