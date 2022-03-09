import React, { useState,useEffect } from 'react';
import { FlatList, View,StyleSheet, StatusBar, RefreshControl,Text } from 'react-native';
import {API_URL} from '@env';
import Card from '../components/Card';
import HeaderNavbar from '../components/HeaderNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
function HomeScreen(navigation) {
    const API= {API_URL};
    //let id_username= await AsyncStorage.getItem("@Login:id_username");
    const [dataServer,changeDataServer]= useState([]);
    const [marterData, setmarterData] = useState([]);
    const [search, setsearch] = useState('');
    const [checkSearch, setcheckSearch] = useState(true);
    useEffect(() => {
        getData();     
    },[])
    useEffect(() => {
        searchFilter(search)
        return () => {
        }
    }, [search])
    function getData(){
            fetch(API.API_URL+'fetch_all.php')
            .then((response)=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                changeDataServer(responseJson);
                setmarterData(responseJson);
            })
            .catch((error)=>{console.log(error)});
            //console.log(dataServer);
        return dataServer; 
    }
    const [refreshing, setRefreshing] = React.useState(false);
    const searchFilter=(text)=>{
        // console.log(search);
        // if(text){
        //     const newData=marterData.filter((item)=>{
        //         const itemData =item.name?item.name.toUpperCase()
        //         :"".toUpperCase();
        //     const textData=text.toUpperCase();
        //     return itemData.indexOf(textData)>-1;
        //     });
        //     changeDataServer(newData);
        //     setsearch(text);
        // }else{
        //     changeDataServer(marterData);
        //     setsearch(text);
        // }
        fetch(API.API_URL+'search.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               'search': search,
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            if(responseJson!=="Khongcodulieu"){
                changeDataServer(responseJson);
                setcheckSearch(true);
            }
            else{
                //changeDataServer(marterData);
                setcheckSearch(false);
            }

        })
        .catch((error)=>{console.log(error);});
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(3000).then(() => {setRefreshing(false);getData()});
    }, []);
    return (
        <View style={{flex:0.92}}>
            <HeaderNavbar
                //onPressIn={setsearch('')}
                value={search}
                onChangeText={(text)=>setsearch(text)}
                //onChange={(text)=>searchFilter(text)}
                //onEndEditing={(text)=>searchFilter(text)}
                
            />
                {checkSearch?
                <FlatList
                    data={dataServer}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={({item})=>
                        <Card 
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            id_product={item.id_product}
                            //id_username={id_username}
                        />
                    }
                    numColumns={2}
                    keyExtractor={item => item.id}
                    refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        size={30}
                        // colors={"#08d4c4"}
                        // progressBackgroundColor={['#08d4c4','#01ab9d']}
                        // progressBackgroundColor={'#08d4c4'}
                    />
                    }
                />
                :
                    <View style={{alignItems:'center',marginTop:20}}>
                        <Text style={{fontSize:20,color:'#009387'}}>Không có dữ liệu!</Text>
                    </View>
                }
        </View>
    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-evenly',
    },
})