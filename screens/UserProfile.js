import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SwipeListView } from 'react-native-swipe-list-view';
import {API_URL} from '@env';
import MyTextInput from '../components/MyTextInput';
import Feather from 'react-native-vector-icons/Feather';
import CartFollow from '../components/CartFollow';
import Activity from '../components/Activity';
import profile from '../assets/profile.png';
// Tab ICons...
import home from '../assets/home.png';
import user from '../assets/user.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
import camera from '../assets/camera.jpg';
import timemachine from '../assets/timemachine.png';
import birthday from '../assets/birthday.png';
import email from '../assets/email.png';
import phone from '../assets/phone.png';
import address from '../assets/address.png';
import identity from '../assets/identity.png';
import heart from '../assets/heart.png';
import list from '../assets/list.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/photo.jpg';
import { useNavigation } from '@react-navigation/core';

let re =0;

export default function UserProfile({props,route,navigation}) {
  // re+=1;
  const screenHeight = Dimensions.get('window').height;
  const [imageURI,changeImageURI] =useState(null);
  const [dataImage, setDataImage] = useState(null);
  const [checkPickImage, setCheckPickImage] = useState(false);
  const [checkUploadSuccess, setCheckUploadSuccess] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [follow, setfollow] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [checkFollow, setcheckFollow] = useState(false);
  const [rent, setrent] = useState({});
  const [checkRent, setcheckRent] = useState(false);
  const [loadingImg, setloadingImg] = useState(false);
  const [btnupload, setbtnupload] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      autoFetchInfo();re=0;
    });FetchFollowed();FetchRent();
    return unsubscribe;
  },[navigation,refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      autoFetchInfo();
    });FetchFollowed();FetchRent();
    return unsubscribe;
  },[]);

 const API= {API_URL}; 
 const [info, setInfo] = useState([]);
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
      .then(async(responseJson)=>{
        console.log(responseJson);
          setInfo(responseJson);//console.log(responseJson);
      })
    .catch((error)=>{console.log(error);});
    }
    const FetchFollowed=async()=>{
      let id_username= await AsyncStorage.getItem("@Login:id_username");
      //console.log("+++++++++++++++"+id_username);
        fetch(API.API_URL+'fetch_followed.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
           if(responseJson!=="Not Followed"){
             setfollow(responseJson);
             setcheckFollow(true);
           }
            else {
              setcheckFollow(false);
            }
        })
        .catch((error)=>{console.log(error);});
    }
    const FetchRent=async()=>{
      let id_username= await AsyncStorage.getItem("@Login:id_username");
      //console.log("+++++++++++++++"+id_username);
        fetch(API.API_URL+'fetch_user_rent.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
           if(responseJson!=="Not Rent"){
             setrent(responseJson);
             setcheckRent(true);
           }
            else {
              setcheckRent(false);
            }
        })
        .catch((error)=>{console.log(error);});
    }
    const Unfollow=async(id_product)=>{
      let id_username= await AsyncStorage.getItem("@Login:id_username");
      fetch(API.API_URL+'unfollow.php', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'id_username':id_username,
              'id_product': id_product,
          })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson==="Unfollow success"){
            setRefresh(!refresh);
           }
      })
      .catch((error)=>{console.log(error);});
  }
  const Unrent=async(id_product)=>{
    let id_username= await AsyncStorage.getItem("@Login:id_username");
    fetch(API.API_URL+'unrent.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id_username':id_username,
            'id_product': id_product,
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson==="Unrent success"){
          setRefresh(!refresh);
         }
    })
    .catch((error)=>{console.log(error);});
  }
    const pickImage=async()=>{
      let result =await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:false,
          aspect:[4,3],
          quality:1,
      });
      if(!result.cancelled){
        changeImageURI(result.uri);
        setDataImage(result.data);
        setCheckPickImage(true);   
        setCheckUploadSuccess(false);
        setbtnupload(true);
      }
     
      else{
        setCheckPickImage(false);
      }
  }
    async function ImageUpload() {
      setloadingImg(true);
      const response = await fetch(imageURI);
      const blob = await response.blob();
      var reader = new FileReader();
      reader.onload = () => {
        var InsertAPI = API.API_URL+'avatar_upload.php';
        //console.log(reader.result);
              var Data={img:reader.result,username:info.username};
              var headers={
              'Accept':'application/json',
              'Content-Type':'application.json'
              }
              fetch(InsertAPI,{
                  method:'POST',
                  headers:headers,
                  body:JSON.stringify(Data),
              })
              .then((response)=>response.json())
              .then((responseJson)=>{
                  //console.log(responseJson)
                  if(responseJson==1){
                    setCheckUploadSuccess(true);
                    setWaiting(false);
                    autoFetchInfo();
                    setloadingImg(false);
                    setbtnupload(false);
                  }
                  else {
                    setCheckUploadSuccess(false);
                    setWaiting(true);
                    setloadingImg(false);
                  }
              })
              .catch(err=>{
                  console.log(err);
                  Alert.alert("Tải ảnh lên thất bại!");
              })  
  }
  reader.readAsDataURL(blob);
              }
 
  const [currentTab, setCurrentTab] = useState("Trang Cá Nhân");
  
  const [showMenu, setShowMenu] = useState(false);

  

  const offsetValue = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  // Data
  const [data, setData] = useState({
    name:"",
    address:"",
    phonenumber:"",
    check_phonenumber:true,
    hobby:"",
    CMND:"",
    email:"",
  });
  const [dataPrivate,setdataPrivate] = useState({
    passwordold:'',
    passwordnew:'',
    passwordnewconfirm:'',
    securePasswordOldEntry:true,
    securePasswordNewEntry:true,
    securePasswordNewConfirmEntry:true,
    isValidPasswordOld: false,
    isValidPasswordNew: false,
    isValidPasswordNewConfirm: false,
    checkpassword:true,
    changePassSuccess:false,
    changePassWrong:true,
    hidenchangePassword:false,      
  });
  const handlePasswordOldChange = (val) => {
    if( val.trim().length >= 8 ) {
        setdataPrivate({
            ...dataPrivate,
            passwordold: val,
            isValidPasswordOld: true
        });
    } else {
        setdataPrivate({
            ...dataPrivate,
            passwordold: val,
            isValidPasswordOld: false
        });
    }
  }
  const handlePasswordNewChange = (val) => {
    if( val.trim().length >= 8 ) {
        setdataPrivate({
            ...dataPrivate,
            passwordnew: val,
            isValidPasswordNew: true
        });
    } else {
        setdataPrivate({
            ...dataPrivate,
            passwordnew: val,
            isValidPasswordNew: false
        });
    }
  }
  const handlePasswordNewConfirmChange = (val) => {
      if( val.trim().length >= 8 ) {
          setdataPrivate({
              ...dataPrivate,
              passwordnewconfirm: val,
              isValidPasswordNewConfirm: true
          });
      } else {
          setdataPrivate({
              ...dataPrivate,
              passwordnewconfirm: val,
              isValidPasswordNewConfirm: false
          });
      }
  }
  const updateSecurePasswordOldEntry = () => {
      setdataPrivate({
          ...dataPrivate,
          securePasswordOldEntry: !dataPrivate.securePasswordOldEntry
      });
  }
  const updateSecurePasswordNewEntry = () => {
      setdataPrivate({
          ...dataPrivate,
          securePasswordNewEntry: !dataPrivate.securePasswordNewEntry
      });
  }
  const updateSecurePasswordNewConfirmEntry = () => {
    setdataPrivate({
        ...dataPrivate,
        securePasswordNewConfirmEntry: !dataPrivate.securePasswordNewConfirmEntry
    });
  }
  const changePassword=async()=>{
    if((dataPrivate.passwordnew!=""&&dataPrivate.passwordnewconfirm!="")&&dataPrivate.passwordnewconfirm==dataPrivate.passwordnew){
        if((dataPrivate.passwordnew===dataPrivate.passwordnewconfirm)&&dataPrivate.passwordnew.trim().length>7){
          const value = await AsyncStorage.getItem("@Login:username");
          fetch(API.API_URL+'changepassword.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'username': value,
              'password':dataPrivate.passwordold,
              'passwordnew':dataPrivate.passwordnew,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson);
              if(responseJson==="ChangePassword success") {
                setdataPrivate({
                  ...dataPrivate,
                  changePassSuccess:true,
                  checkpassword:true,
                  changePassWrong:true
                });
                Alert.alert("Đã thay đỏi mật khẩu!","Vui lòng đăng nhập lại!",[{text:"OK",onPress:async()=>{navigation.replace('SignIn');await AsyncStorage.clear();}}])
              }
              else{
                setdataPrivate({
                  ...dataPrivate,
                  changePassSuccess:false,
                  checkpassword:true,
                  changePassWrong:false
                })
              }
          })
          .catch((error)=>{console.log(error);});
        }
        else{
          Alert.alert("Mật khẩu nhập chưa đúng!");
        }
    }
    else{
      setdataPrivate({
        ...dataPrivate,
        checkpassword:false
      })
    }
  }
  // console.log(re);
  return (
    <SafeAreaView style={styles.container}>

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
            {info.avatar==""?
              <Image source={user} style={styles.avatarImage}
              resizeMode="contain"></Image>
            :
              <Image source={{uri:info.avatar}} style={styles.avatarImage}
              resizeMode="contain"></Image>
            }
        {info.fullname?
        <Text style={styles.lfullname}>{info.fullname}</Text>
        :
        null
        }


        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Trang Chủ", home)}
          {TabButton(currentTab, setCurrentTab, "Trang Cá Nhân", user)}
          {TabButton(currentTab, setCurrentTab, "Yêu Thích", heart)}
          {TabButton(currentTab, setCurrentTab, "Lịch Sử", list)}
          {/* {TabButton(currentTab, setCurrentTab, "Notifications", notifications)} */}
          {TabButton(currentTab, setCurrentTab, "Cài đặt chung", settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "Đăng xuất", logout)}
        </View>

      </View>

      {
        // Over lay View...
      
      }
      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>
      <View style={styles.trick}></View>
        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true,
              height:100
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>
          <View style={{flexDirection:"row",alignItems:'center'}}>
            <Image source={showMenu ? close : menu} style={styles.iconClose}></Image>
            <Text style={styles.textClose}>{showMenu ? "Đóng" : "Menu"}</Text>
          </View>   
          </TouchableOpacity>
          {/* {currentTab =="Cài đặt chung"?
          <TouchableOpacity>
              <Text style={styles.textSave}>Save
              </Text>
          </TouchableOpacity>
          :null
        } */}
        </View>
            {currentTab =="Trang Cá Nhân"?
            <View>
            <Text style={styles.textTitle}>{currentTab}</Text>
            <ScrollView contentContainerStyle={{height:screenHeight+500}} 
              stickyHeaderHiddenOnScroll={false}
              showsVerticalScrollIndicator={false}
            >
              {checkPickImage?
              <Image source={{uri:imageURI}} style={styles.imageAvatar}
              resizeMode="contain"></Image>
              :
              <View>
                {info.avatar==""?
                  <Image source={user} style={styles.imageAvatar}
                  resizeMode="contain"></Image>
                :
                  <View>
                      <Activity/>
                      <Image source={{uri:info.avatar}} style={styles.imageAvatar}
                        resizeMode="contain"></Image>
                  </View>
                }
              </View>
              }
              <TouchableOpacity style={styles.btnPickImage}
                    onPress={()=>{pickImage()}}
                    >
                      <Image source={camera} 
                            style={styles.iconCamera}
                        resizeMode="stretch">
                      </Image>
              </TouchableOpacity>
              {checkPickImage?
              <View>
                  {checkUploadSuccess?
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                      {waiting?
                          <Text style={{fontSize:20,color:'#01ab9d'}}>Cập nhật ảnh thất bại!</Text>
                        :
                          <Text style={{fontSize:20,color:'#01ab9d'}}>Cập nhật ảnh thành công!</Text>
                        }
                  </View>
                  :
                        <View>
                          {loadingImg?
                            <ActivityIndicator size={"large"} color={"#01ab9d"} textContent={'Loading...'}/>
                          :
                            null
                          }
                        </View>
                  }
                  {btnupload?
                  <TouchableOpacity
                      style={styles.btnUpdateAvatar}
                      onPress={async()=>ImageUpload()}
                      >
                      <Text style={styles.textUpdateAvatar}>Tải ảnh lên</Text>
                  </TouchableOpacity>
                  :
                  null}
                  
                </View>
                :
                null
                }



                {/* Giới thiệu */}
                <View style={{marginTop:30,backgroundColor:'#f1f1f1',borderRadius:10}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16,marginTop:8}}>
                    <Text style={{fontSize:18,fontWeight:'600',marginLeft:6}}>Giới thiệu</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('IntroduceInfo',{fullname:info.fullname,birthday:info.birthday,API_URL:API.API_URL})}>
                      <Text style={{fontSize:18,fontWeight:'400',color:'#01ab9d',marginRight:10}}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection:'row',marginBottom:8,paddingLeft:6}}>
                      <Image 
                            source={user}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Họ và Tên: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.fullname}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginBottom:8,paddingLeft:6}}>
                      <Image 
                            source={birthday}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Sinh nhật: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.birthday}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginBottom:18,paddingLeft:6}}>
                      <Image 
                            source={timemachine}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Đang hoạt động</Text>
                  </View>
                </View>
                
                {/* Thông tin liên hệ */}
                <View style={{marginTop:30,backgroundColor:'#f1f1f1',borderRadius:10}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16,marginTop:8}}>
                    <Text style={{fontSize:18,fontWeight:'600',marginLeft:6}}>Thông tin liên hệ</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('ContactInfo',{email:info.email,API_URL:API.API_URL,phonenumber:info.phonenumber,address:info.address})}>
                      <Text style={{fontSize:18,fontWeight:'400',color:'#01ab9d',marginRight:10}}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection:'row',marginBottom:8,paddingLeft:6}}>
                      <Image 
                            source={phone}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Số điện thoại: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.phonenumber}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginBottom:8,paddingLeft:6}}>
                      <Image 
                            source={email}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Email: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.email}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginBottom:18,paddingLeft:6}}>
                      <Image 
                            source={address}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>Địa chỉ: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.address}</Text>
                  </View>
                </View>

                {/* Riêng tư */}
                <View style={{marginTop:30,backgroundColor:'#f1f1f1',borderRadius:10}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:16,marginTop:8}}>
                    <Text style={{fontSize:18,fontWeight:'600',marginLeft:6}}>Riêng tư</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('PrivateInfo',{CMND:info.CMND,API_URL:API.API_URL})}>
                      <Text style={{fontSize:18,fontWeight:'400',color:'#01ab9d',marginRight:10}}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection:'row',marginBottom:18,paddingLeft:6}}>
                      <Image 
                            source={identity}
                            style={{width:20,height:20,marginRight:10}}
                        ></Image>
                      <Text style={{fontSize:16,fontWeight:'400'}}>CMND: </Text>
                      <Text style={{fontSize:16,fontWeight:'600'}}>{info.CMND}</Text>
                  </View>
                </View>
            </ScrollView>
            





          {info.fullname?
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold', 
            paddingTop: 15,
            paddingBottom: 5
          }}> {info.fullname}</Text>
          :
          null
          }
          <Text style={{
          }}>NinhVanVienKHMTK5</Text>
            </View>
          :
            null
            }
            {currentTab =="Cài đặt chung"?
            
            <View>
              <Text style={styles.textTitle}>{currentTab}</Text>
              <View style={{marginTop:20,paddingLeft:10,marginBottom:10}}
                onStartShouldSetResponder={() =>setdataPrivate({
                  ...dataPrivate,
                  hidenchangePassword:!dataPrivate.hidenchangePassword,
                })}
              >
                <Text style={{fontSize:20,
                  fontWeight:"bold",
                  fontStyle:"italic",
                  textDecorationLine: 'underline',
                  color:"#01ab9d"
                  }}
                >Thay Đổi Mật Khẩu</Text>
              </View>
              {dataPrivate.hidenchangePassword?
                <View style={{marginTop:20}}>
                <View>
                  <MyTextInput label={"Nhập mật khẩu cũ"}
                        onChangeText ={(val)=>handlePasswordOldChange(val)}
                        value= {dataPrivate.passwordold}
                        placeholder="Nhập mật khẩu cũ"
                        secureTextEntry={dataPrivate.securePasswordOldEntry ? true: false}
                    />
                     <TouchableOpacity style={styles.eye_password}
                    onPress={updateSecurePasswordOldEntry}
                    >
                    {dataPrivate.securePasswordOldEntry ? 
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
                <View>
                  <MyTextInput label={"Nhập mật khẩu mới"}
                      onChangeText ={(val)=>handlePasswordNewChange(val)}
                        value= {dataPrivate.passwordnew}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={dataPrivate.securePasswordNewEntry ? true: false}
                    />
                     <TouchableOpacity style={styles.eye_password}
                    onPress={updateSecurePasswordNewEntry}
                    >
                    {dataPrivate.securePasswordNewEntry ? 
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
                <View>
                  <MyTextInput label={"Nhập lại mật khẩu mới"}
                        onChangeText ={(val)=>handlePasswordNewConfirmChange(val)}
                        value= {dataPrivate.passwordnewconfirm}
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={dataPrivate.securePasswordNewConfirmEntry ? true: false}
                    />
                     <TouchableOpacity style={styles.eye_password}
                    onPress={updateSecurePasswordNewConfirmEntry}
                    >
                    {dataPrivate.securePasswordNewConfirmEntry ? 
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
                {!dataPrivate.checkpassword?
                <View style={{justifyContent:"center",alignItems:"center"}}>
                  <Text style={{fontSize:16,color:"red"}}>Mật khẩu nhập chưa chính xác vui lòng kiểm tra lại!</Text>
                </View>
                :null}
                {dataPrivate.changePassSuccess?
                <View style={{justifyContent:"center",alignItems:"center"}}>
                  <Text style={{fontSize:20,color:"#01ab9d"}}>Mật khẩu đã được thay đổi thành công!</Text>
                </View>:null}
                {dataPrivate.changePassWrong?
                null
                :<View style={{justifyContent:"center",alignItems:"center"}}>
                  <Text style={{fontSize:20,color:"red"}}>Thay đổi mật khẩu thất bại!</Text>
                  <Text style={{fontSize:20,color:"red"}}>Vui lòng kiểm tra lại!</Text>
                </View>}
                <TouchableOpacity
                            colors={['#08d4c4','#01ab9d']}
                            style={[styles.update,{
                                borderColor:'#009387',
                                borderWidth:1,
                                backgroundColor:'#01ab9d',
                            }]}
                            onPress={()=>changePassword()}
                        >
                            <Text style={[styles.textUpdate,{color:'#fff'}]}>Đổi Mật Khẩu</Text>
                </TouchableOpacity>
              </View>
              :null}
            </View>  
          :null
            }
          {currentTab =="Yêu Thích"?
            <View>
              <Text style={styles.textTitle}>{currentTab}</Text>
              {checkFollow?
                <View style={{height:'86.6%'}}>
                    <SwipeListView
                          data={follow}
                          renderItem={ ({item}) => (
                              <CartFollow
                                  image={item.image}
                                  name={item.name}
                                  price={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')+"đ"}
                                  id_product={item.id_product}
                              />
                          )}
                          renderHiddenItem={ ({item}) => (
                              <TouchableOpacity style={styles.btn_delete} onPress={()=>Unfollow(item.id_product)}>
                                  <Text style={styles.text_delete}>Xoá</Text>
                              </TouchableOpacity>
                          )}
                          leftOpenValue={0}
                          rightOpenValue={-75}
                      /> 
                </View>
               
                :
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    {/* <ActivityIndicator size={"large"} color={"#01ab9d"} textContent={'Loading...'}/>  */}
                    <Text style={{fontSize:20,color:"#01ab9d"}}>Bạn không theo dõi sản phẩm nào!</Text>
                  </View>
                }
            </View>
          :
            null
          }
          {currentTab =="Lịch Sử"?
            <View>
              <Text style={styles.textTitle}>{currentTab}</Text>
              {checkRent?
                <View style={{height:'86.6%'}}>
                    <SwipeListView
                          data={rent}
                          renderItem={ ({item}) => (
                              <CartFollow
                                  image={item.image}
                                  name={item.name}
                                  price={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')+"đ"}
                                  id_product={item.id_product}
                                  status={item.status}
                              />
                          )}
                          renderHiddenItem={ ({item}) => (
                              <TouchableOpacity style={styles.btn_delete} 
                              onPress={()=>Unrent(item.id_product)}
                              >
                                  <Text style={styles.text_delete}>Huỷ</Text>
                              </TouchableOpacity>
                          )}
                          leftOpenValue={0}
                          rightOpenValue={-75}
                      /> 
                </View>
               
                :
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    {/* <ActivityIndicator size={"large"} color={"#01ab9d"} textContent={'Loading...'}/>  */}
                    <Text style={{fontSize:20,color:"#01ab9d"}}>Bạn chưa yêu cầu thuê sản phẩm nào!</Text>
                  </View>
                }
            </View>
          :
            /* <View style={{justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={"large"} color={"#01ab9d"} textContent={'Loading...'}/> 
                <Text style={{fontSize:20,color:"#01ab9d"}}>Đang phát triển...</Text>
            </View> */
            null
          }
            
        </Animated.View>
        
      </Animated.View>
        
    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
    const navigation = useNavigation();
    const [userView, setUserView] = useState(false)
  return (
      <TouchableOpacity onPress={async() => {
      if (title == "Đăng xuất") {
        // Do your Stuff...
          Alert.alert("Thông báo!",
          "Bạn muốn đăng xuất?",
          [{text:"Đăng xuất",
          onPress:async ()=>{navigation.replace("SignIn");await AsyncStorage.clear();}},
          {text:"Huỷ"}])
      } 
      else if(title == "Trang Chủ"){
          navigation.navigate("Home");
      }
      // else if(title=="Yêu Thích"){
      //   ()=>{FetchFollowed()}
      // }
      else{
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15,
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#01ab9d" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#01ab9d" : "white"
        }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01ab9d',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  trick:{
    backgroundColor:'#01ab9d',
    height:100,
    width:"120%",
    position:'absolute',
    bottom:-100,
    left:-20,
    zIndex:10
  },
  warning:{
    color:"#08d4c4",
    fontSize:16,
    fontWeight:"300",
    marginLeft:26,
    position:"absolute",
    top:60
  },
  mTextinput:{
    width:"100%",
    marginTop:10,
  },
  lfullname:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20
  },
  avatarImage:{
    width: 60,
    height: 60,
    borderRadius: 10,
    marginTop: 8,
    // backgroundColor:"#ccc"
  },
  textClose:{
    fontSize:30,
    color: 'black',
    marginTop: 20,
    paddingLeft:20,
    fontWeight:'600'
  },
  iconClose:{
    width: 24,
    height: 24,
    tintColor: 'black',
    marginTop: 20,
  },
  textSave:{
    fontSize:30,
    color: '#01ab9d',
    marginTop: 20,
    paddingLeft:20,
    fontWeight:'600',
    marginRight:20
  },
  textTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 20,
    marginBottom:6
  },
  imageAvatar:{
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginTop: 25,
  },
  btnPickImage:{
    position:"absolute",
    left:0,
    top:0,
    right:0,
    width:50,
    height:50,
  },
  iconCamera:{
    width: 40,
    height: 40,
    marginTop: 25,
    backgroundColor:"#fff",
    borderRadius:10,
    zIndex:5,
    opacity:0.7
  },
  btnUpdateAvatar:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor:'#009387',
    borderWidth:1,
    marginTop:20,
    backgroundColor:'#009387',
    opacity:0.8
  },
  textUpdateAvatar:{
    color:'#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btn_delete:{
    backgroundColor:"#D9332B",
    width:75,
    height:"auto",
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius:10,
    borderTopRightRadius:10
  },
  text_delete:{
    fontSize:20,
    color:'#fff',
    fontWeight:"bold"
  },
  eye_password:{
   position:"absolute",
   right:20,
   top:"34%"
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
  },
});
