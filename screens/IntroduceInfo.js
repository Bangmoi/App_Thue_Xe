import React,{useState,useEffect} from 'react';
import { View,Text,Image,TouchableOpacity,KeyboardAvoidingView, StyleSheet, ScrollView,Alert } from 'react-native';
import MyTextInput from '../components/MyTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
function IntroduceInfo({props,route}) {
    const [datePicker, setdatePicker] = useState("");
    useEffect(() => {
        setdatePicker(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear())
    })
    const [data, setData] = useState({
        name:"",
        birth:"",
        check_name:false,
        check_birth:false,
        fullname:route.params.fullname,
        birthday:route.params.birthday,
        API_URL:route.params.API_URL,
        check_Success:false,
      });
      const handleNameChange = (val) => {
        if(val.length>=5) {
            setData({
                ...data,
                name: val,
                check_name:true
            });
        } else {
            setData({
                ...data,
                name: val,
                check_name:false
            });
        }
    };
    const UpdateInfo=async()=>{
 
        const value = await AsyncStorage.getItem("@Login:username");
        fetch(data.API_URL+'UpdateIntroduct.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'fullname': data.name,
               'birthday': datePicker,
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
                Alert.alert("Update False");
            }
            console.log(responseJson);
        })
        .catch((error)=>{console.log(error);});
    }
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [checkdate, setCheckdate] = useState(false);
    const [colorBorder, setColorBorder] = useState(true);
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setCheckdate(true);
      setColorBorder(!colorBorder);
      setData({
        ...data,
        check_birth:true,
    });
    };
    const showMode = (currentMode) => {
      setShow(!show);
      setMode(currentMode);
    };
    const showDatepicker = () => {
      showMode('date');
    };

    return (
        <View style={styles.container}>
             <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}  enabled keyboardVerticalOffset={4}>
              <ScrollView style={{height:"100%"}}>
              <View>
                <View style={styles.mTextinput}>
                    {data.fullname==''?
                  <MyTextInput label={"Họ và Tên ("+data.name.length+"/80)"}
                      onChangeText ={(val)=>handleNameChange(val)}
                      value= {data.name}
                      placeholder="Nhập họ tên"
                      maxLength={80}
                  />
                  :
                  <MyTextInput label={"Họ và Tên ("+data.name.length+"/80)"}
                      onChangeText ={(val)=>handleNameChange(val)}
                      value= {data.name}
                      placeholder={data.fullname}
                      maxLength={80}
                  />
                    }
                </View>
                <TouchableOpacity onPress={()=>{setColorBorder(!colorBorder);showDatepicker();}} 
                    style={{height:50,width:'100%'}}
                >   
                    <Text style={{textAlign:'center',
                            fontSize:16,
                            color:colorBorder?'#444':"#01ab9d",
                            position:"absolute",
                            backgroundColor:"#fff",
                            left:40,
                            top:0,
                            zIndex:2,
                            fontWeight:"400",}}
                        >Sinh nhật</Text>
                    <View style={{
                        borderRadius:10,
                        borderColor:colorBorder?"#ccc":"#01ab9d",
                        borderWidth:2,
                        height:48,
                        justifyContent:'center',
                        margin:10,
                        paddingLeft:16,
                    }}>
                    {checkdate?
                        <Text style={{fontSize:20,color:"black"}}>{datePicker}</Text>
                    :
                        <View>
                            {data.birthday==""?
                                <Text style={{fontSize:20,color:'#ccc'}}>Chọn ngày tháng năm sinh</Text>
                            :
                                <Text style={{fontSize:20,color:'#ccc'}}>{data.birthday}</Text>
                            }
                        </View>
                    }  
                    </View>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </TouchableOpacity>
                    <View style={{justifyContent:'center',alignItems:'center',height:60,width:"100%",marginTop:30}}>
                            {data.check_Success?
                            <Text style={styles.warning}>Cập nhật thành công!</Text>
                            :null}
                    </View>
                    {data.check_birth&&data.check_name?
                    <TouchableOpacity
                                colors={['#08d4c4','#01ab9d']}
                                style={[styles.update,{
                                    borderColor:'#009387',
                                    borderWidth:1,
                                    backgroundColor:'#01ab9d',
                                }]}
                                onPress={()=>UpdateInfo()}
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

export default IntroduceInfo;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff'
    },
    warning:{
        color:"#08d4c4",
        fontSize:26,
        fontWeight:"300",
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
    },
    textUpdate: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})