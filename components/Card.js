import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text ,StyleSheet, View, Image,TouchableOpacity,Alert} from 'react-native';
import DescriptionScreen from '../screens/DescriptionScreen';
function Card({name,image,price,id_product}) {
    const navigation= useNavigation();
    return (
        // <View style={styles.content}>
                <View style={styles.content_Element}
                    onStartShouldSetResponder={() => navigation.navigate("Description",{id_product,price})}>
                    <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Description",{id_product,price})}>
                        <Image style={styles.imageStyle}
                            source={{uri:image}}
                            resizeMode={"stretch"}
                        />
                        <Text style={styles.textPrice}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ/Ngày</Text>
                        <Text style={styles.textTitle}>{name}</Text>
                        {/* <Text numberOfLines={2} style={styles.textContent}>{item.extend}</Text> */}
                        
                    </TouchableOpacity>
                </View>
        //  </View>
    );
}

export default Card;
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    content:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
    },
    btn:{
        justifyContent:'flex-start',
        alignItems:'center',
        textAlign:'center',
    },
    content_Element:{
        width:'45%',
        justifyContent:'flex-start',
        alignItems:'center',
        textAlign:'center',
        borderStyle:'solid',
        borderWidth:3,
        borderColor:'#08d4c4',
        borderTopLeftRadius:20,
        borderBottomRightRadius:20,
        margin:10,
        padding:10,
        shadowOffset:{  width: 5,  height: 5,  },
        shadowColor:"black",
        shadowOpacity:0.4,
    },
    imageStyle:{
        height:150,
        width:150,
        margin:10,
        borderTopLeftRadius:10,
        borderBottomRightRadius:10,
    },
    textTitle:{
        fontSize:18,
        fontWeight:'600',
        color:'#333',
        lineHeight:30,
    },
    textContent:{
        fontSize:12,
        fontWeight:'400',
        color:'#333',
        lineHeight:20,
    },
    textPrice:{
        color:'#D9332B',
        fontSize:16,
        fontWeight:'600',
        lineHeight:22,
    },
})