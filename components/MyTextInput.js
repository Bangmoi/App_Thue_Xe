
import React, { useState } from 'react';
import { StyleSheet, Text, View ,TextInput } from 'react-native';

function MyTextInput(props){
    const [colorBorder, setColorBorder] = useState(true);
    return(
        <View>
            <Text style={{textAlign:'center',
                            fontSize:16,
                            color:colorBorder?'#444':"#01ab9d",
                            position:"absolute",
                            backgroundColor:"#fff",
                            left:40,
                            top:0,
                            zIndex:2,
                            fontWeight:"400",}}>
                {props.label}
            </Text>
            <TextInput 
                style={{borderWidth:colorBorder?1:2,
                        borderColor:colorBorder?"#ccc":"#01ab9d",
                        height:48,
                        margin:10,
                        fontSize:20,
                        color:'black',
                        paddingLeft:16,
                        borderRadius:10,
                        paddingRight:10,
                    }}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                clearButtonMode="always"
                onFocus={()=>{setColorBorder(!colorBorder)}}
                onEndEditing={()=>{setColorBorder(!colorBorder)}}
                keyboardType={props.keyboardType}
                textContentType={props.textContentType}
                secureTextEntry={props.secureTextEntry}
            ></TextInput>
        </View>
    );
}
export default MyTextInput;
const styles = StyleSheet.create({
    mTextInput:{
        borderWidth:1,
        //borderColor:colorBorder?"green":"red",
        height:48,
        margin:10,
        fontSize:20,
        color:'black',
        paddingLeft:16,
        borderRadius:10,
        paddingRight:10,
    },
    TextInputTittle:{
        textAlign:'center',
        fontSize:16,
        color:'#444',
        position:"absolute",
        backgroundColor:"#fff",
        left:40,
        top:0,
        zIndex:2,
        fontWeight:"400",
    },
})