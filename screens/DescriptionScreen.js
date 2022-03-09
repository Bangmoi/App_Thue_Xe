import { useNavigation } from '@react-navigation/core';
import React, { useState,useEffect } from 'react';
import {View, Text, TouchableOpacity,StyleSheet, Image,SafeAreaView,ScrollView, StatusBar,Alert} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

 function  DescriptionScreen({props,route}) {
    const API= {API_URL};
    const [data,setData]=useState([])
    useEffect(() => {
        FetchDataProduct();
        CheckFollow();
        CheckRentVehicle();
    },[checkFollow])
    const [dataDescription,setDataDescription]=useState([]);
    const [data_ImagePath,setData_ImagePath] =useState([]);
    const [checkFollow, setcheckFollow] = useState(false);
    const [checkRent, setcheckRent] = useState(false);
    const [rent, setrent] = useState({});
    const FetchDataProduct=()=>{
        //console.log(route.params.id_product);
        fetch(API.API_URL+'fetch_images_product.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // console.log(responseJson);
            setData(responseJson);
            setData_ImagePath(responseJson.images);
            setDataDescription(responseJson.description)    
        })
        .catch((error)=>{console.log(error);});
    }
    const Follow=async()=>{
        let id_username= await AsyncStorage.getItem("@Login:id_username");
        fetch(API.API_URL+'follow.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
                'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson==="Follow success"){
                setcheckFollow(true);
             }
        })
        .catch((error)=>{console.log(error);});
    }
    const Unfollow=async()=>{
        let id_username= await AsyncStorage.getItem("@Login:id_username");
        fetch(API.API_URL+'unfollow.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
                'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson==="Unfollow success"){
                setcheckFollow(false);
             }
             else{
                setcheckFollow(true);
             }
        })
        .catch((error)=>{console.log(error);});
    }

    const CheckFollow=async()=>{
        let id_username= await AsyncStorage.getItem("@Login:id_username");
        fetch(API.API_URL+'check_follow.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
                'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
             if(responseJson==="Followed"){
                setcheckFollow(true);
             }
             else{
                setcheckFollow(false);
             }
        })
        .catch((error)=>{console.log(error);});
    }
    const RentVehicle=async()=>{
        let id_username= await AsyncStorage.getItem("@Login:id_username");
        fetch(API.API_URL+'rent_vehicles.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
                'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
             if(responseJson==="Rent success"){
                setcheckRent(true);
                Alert.alert("Đã gửi yêu cầu!","",[{text:"OK",onPress:()=>{CheckRentVehicle()}}])
             }
             else{
                setcheckRent(false)
             }
        })
        .catch((error)=>{console.log(error);});
    }
    const CheckRentVehicle=async()=>{
        let id_username= await AsyncStorage.getItem("@Login:id_username");
        fetch(API.API_URL+'check_rent.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id_username':id_username,
                'id_product': route.params.id_product,
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
             if(responseJson!=="Not Rent"){
                 setrent(responseJson);
                 //console.log(responseJson);
                 setcheckRent(true);
             }
             else{
                setcheckRent(false);
             }
        })
        .catch((error)=>{console.log(error);});
    }
    const navigation= useNavigation();
    // console.log(data);
    var result = [];
    for(var key in data_ImagePath){
        if(data_ImagePath.hasOwnProperty(key)){
            result.push(data_ImagePath[key].image_path);
        }
    }
    // console.log(dataDescription);
    //console.log(route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
    return (
        <SafeAreaView>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={{marginTop:4}}>
                <SliderBox
                    images={result}
                    sliderBoxHeight={200}
                    //onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                    dotColor="#08d4c4"
                    inactiveDotColor="#90A4AE"
                    paginationBoxVerticalPadding={20}
                    autoplay
                    circleLoop
                    resizeMethod={'resize'}
                    resizeMode={'stretch'}
                    paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 0,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 10,
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 0,
                        padding: 0,
                        margin: 0,
                        backgroundColor: "rgba(128, 128, 128, 0.92)"
                    }}
                    ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
                    imageLoadingColor="#2196F3"
                />
            </View>
            <View style={{marginTop:16,padding:14,height:'56%'}}>
            <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {
                dataDescription.map((item, key) => (
                    <Text key={key} style={styles.textStyle} >{item.description} </Text>
                ))
                }

                </ScrollView>
            </View>
            <View style={{flexDirection:'row',justifyContent:"space-evenly"}}>
                {checkFollow?
                    <TouchableOpacity
                    colors={['#FC5232','#D9332B']}
                    style={[styles.btnClick,{
                        borderColor:'#D9332B',
                        borderWidth:1,
                        backgroundColor:'#D9332B',
                    }]}
                    onPress={()=>Unfollow()}>
                    <Text style={[styles.textBtn,{color:'#fff'}]}>Đã Theo Dõi</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        colors={['#08d4c4','#01ab9d']}
                        style={[styles.btnClick,{
                            borderColor:'#009387',
                            borderWidth:1,
                            backgroundColor:'#01ab9d',
                        }]}
                        onPress={()=>Follow()}
                    >
                        <Text style={[styles.textBtn,{color:'#fff'}]}>Theo Dõi</Text>
                    </TouchableOpacity>
                }
                {checkRent?
                    <TouchableOpacity
                        colors={['#f25900','#dd590a']}
                        style={[styles.btnClick,{
                            borderColor:'#dd590a',
                            borderWidth:1,
                            backgroundColor:'#dd590a',
                        }]}
                    >
                        <Text style={[styles.textBtn,{color:'#fff'}]}>{rent.status}</Text>
                        <Text style={[styles.textBtn,{color:'#fff',fontSize:14}]}>{route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                    </TouchableOpacity>
                :
                    <TouchableOpacity
                        colors={['#08d4c4','#01ab9d']}
                        style={[styles.btnClick,{
                            borderColor:'#009387',
                            borderWidth:1,
                            backgroundColor:'#01ab9d',
                        }]}
                        onPress={()=>RentVehicle()}
                    >
                        <Text style={[styles.textBtn,{color:'#fff'}]}>Thuê Ngay</Text>
                        <Text style={[styles.textBtn,{color:'#fff',fontSize:14}]}>{route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
}

export default DescriptionScreen;
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:30
    },
    textStyle:{
        fontSize:20,
    },
    scrollView: {
        height: '100%',
        width: '100%',
        padding:4,
        borderColor:"#ccc",
        borderWidth:1,
        borderRadius:10,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50
    },
    btnClick: {
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textBtn: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})