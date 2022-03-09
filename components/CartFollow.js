import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View,Dimensions, Text, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/core';
let width= Dimensions.get('window').width;
let height= Dimensions.get('window').height;
function CartFollow({image,name,price,id_product,status}) {
    // const [data, setdata] = useState([{}])
    const navigation= useNavigation();
    return (
            <View style={{alignItems:'center',backgroundColor:"#fff"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Description",{id_product,price})}>
                    <View style={styles.container}>
                        <View style={styles.view_content}>
                            <Image source={{uri:image}}
                                style={styles.image_cart}
                                resizeMode="stretch"
                            />
                            <View style={styles.view_text_content}>
                                <Text style={styles.text_name} numberOfLines={2}>{name}</Text>
                                <Text style={styles.text_price} numberOfLines={1}>{price} /Ngày</Text>
                                <Text style={styles.text_status} numberOfLines={1}>{status}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            /* <View style={{height:200,borderColor:'red',borderWidth:3}}>

                    <SwipeListView
                    data={data}
                    renderItem={ (data, rowMap) => (
                        <View style={{height:200,width:"100%",justifyContent:'center',alignItems:'center',backgroundColor:'yellow'}}>
                            <Text>I am  in a SwipeListView</Text>
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <View style={{height:200,width:75,justifyContent:'center',alignItems:'center',backgroundColor:'green',position:"absolute",top:0,right:0,bottom:0}}>
                            <Text>Right</Text>
                        </View>
                    )}
                    leftOpenValue={0}
                    rightOpenValue={-75}
                />
            </View> */
    );
}

export default CartFollow;
const styles = StyleSheet.create({
    container:{
        marginTop:5,
        //width:width
        backgroundColor:"#f5f5f5",
        borderRadius:10, 
        marginBottom:5
    },
    view_content:{
        flexDirection:'row',
        width:width-40,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ccc',
        padding:4,
    },
    image_cart:{
        height:100,
        width:100,
        borderRadius:20,
    },
    view_text_content:{
        marginLeft:20,
        width:width-190
    },
    text_name:{
        fontSize:20,
        lineHeight:30,
        fontWeight:'500'
    },
    text_decription:{
        fontSize:14,
        lineHeight:20,
    },
    text_price:{
        fontSize:20,
        fontWeight:'400',
        color:'#08d4c4'
    },
    text_status:{
        fontSize:20,
        fontWeight:'400',
        color:'#D9332B'
    },
})