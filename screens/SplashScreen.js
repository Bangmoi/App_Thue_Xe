import React,{Component} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {API_URL} from '@env';

autoLogin = async () => {
    const navigation = useNavigation();
    const API= {API_URL}; 
        try {
          const value = await AsyncStorage.getItem("@Login:token");
          //console.log(value);
          if (value !== null) {
            await fetch(API.API_URL+'autoLogin.php',{
            method:'POST',
            headers:{
                Accept:'applicatin/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(
                {
                    "token": value,
                }
            )
            
            })
            .then((Response)=>Response.text())
            .then((responseJson)=>{
                console.log("==========="+responseJson);
                if(responseJson)
                {
                    navigation.navigate('Profile');
                }
                else
                {
                    Alert.alert("Thông báo","",[{text:"Thử lại",onPress:()=>{navigation.navigate('Splash')}},{text:"Huỷ",onPress:()=>{navigation.navigate('SignIn')}}])
                }
            })
            .catch((error)=>{console.log(error);Alert.alert("Thông báo","Đăng nhập thất bại!",[{text:"Thử lại",onPress:()=>{navigation.navigate('Splash')}},{text:"Huỷ",onPress:()=>{navigation.navigate('SignIn')}}])});
          }
        //   else{
        //     navigation.navigate('SignIn')
        //   }
          
        } catch (error) {
            navigation.navigate('SignIn')
        }

      };
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    autoLogin();
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/xengaylogo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Xe Ngay hãy lái theo cách của bạn!</Text>
            <Text style={styles.text}>Xa lộ an toàn vững bước tương lai.</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
            <LinearGradient
                     colors={['#08d4c4', '#01ab9d']}
                     style={styles.signIn}
            >
                <Text style={styles.textSign}>Bắt đầu ngay</Text>
                <MaterialIcons name="navigate-next"
                               color="#fff"
                               size={30}
                                ></MaterialIcons>
            </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo,
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

