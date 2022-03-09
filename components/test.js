import React from 'react';
import { StyleSheet, Text,Image, 
    Alert,
    Dimensions,View, FlatList,ActivityIndicator,
    TouchableOpacity } from 'react-native';
import HomeHeader from "../components/Home/HomeHeader"
import {API_URL} from "@env"

export default class Home extends React.Component{

    constructor(props)
    {
        super(props)
        this.array =[{},],
        this.state={
            bannerlist:[{},],
            getbannerlist:true,
            banner:'a',
            getbanner:true,

            topcategory:[{},],
            gettopcategory:true,

            category:[],
            getcategorya:true,
            getcategoryb:false,

            number: 1,
            error: "true",
        }  
        this.getDataHeader();     
    }
    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getDataHeader();
        });
    }


    getDataCategory = async ()=>{
        fetch(API_URL+'Home/category.php?number=' + this.state.number,{
        })
        .then((Response)=>{
            return Response.json()
        })
        .then((responseJson)=>{
            this.setState({
                category : this.state.category.concat(responseJson),               
            });
            this.setState({getcategorya: false});
            this.setState({getcategoryb: true});
        })
        .catch(()=>{
            this.setState({error: "false"});
        })
    }

    getDataHeader= async()=>{
        fetch(API_URL+'Home/bannerlist.php',{
        })
        .then((Response)=>Response.json())
        .then((responseJson)=>{
            this.setState({bannerlist:responseJson});
            this.setState({getbannerlist: false});
        }).catch(()=>{})

        fetch(API_URL+'Home/banner.php',{
        })
        .then((Response)=>Response.text())
        .then((responseJson)=>{
            this.setState({banner:responseJson});
            this.setState({getbanner:false});
        }).catch(()=>{})


        fetch(API_URL+'Home/topcategory.php',{
        })
        .then((Response)=>Response.json())
        .then((responseJson)=>{
            this.setState({topcategory:responseJson});
            this.setState({gettopcategory:false});
        }).catch(()=>{})

        fetch(API_URL+'Home/category.php?number=0',{
        })
        .then((Response)=>Response.json())
        .then((responseJson)=>{
            this.setState({
                category : responseJson,               
            });
            this.setState({getcategorya: false});
            this.setState({getcategoryb: true});
        }).catch(()=>{})

    }

    RefreshDataCategory=()=>{

        this.setState({number: this.state.number + 1});
        this.getDataCategory();
        
    
    }

    renderItem = ({ item }) => {
        return (
        <TouchableOpacity style={styles.ViewItem} 
        onPress={()=>{this.props.navigation.navigate('Product',{
            id_category : item.id_category
        });}} 
        >
            <Image style={styles.ImgCategory} 
            source={{uri:item.Link_img,}}>
            </Image>
            <View style={{backgroundColor:'#ffff',justifyContent:'space-between'}}>
                <Text numberOfLines={2}
                 style={{paddingLeft: 10, paddingRight: 10,color: "#2c2c2c", fontWeight:"600",fontSize: 15}}>
                {item.title}
                
                </Text>

                <View style={{height: 45, justifyContent: "center"}}>
                    <Text numberOfLines={1} style={{ textAlign: 'left', marginLeft: 10,fontWeight:"bold", fontSize:16,marginBottom: 5,color:"#FF6346"}}>
                    {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        )
      };
    HomeHeader=()=>{
        return(
        <View>
            <HomeHeader 
                bannerlist={this.state.bannerlist} 
                getbannerlist={this.state.getbannerlist} 

                banner={this.state.banner}
                getbanner={this.state.getbanner}
                topcategory={this.state.topcategory}
                gettopcategory={this.state.gettopcategory}>   
                navigation={this.props.navigation}                             
            </HomeHeader>
        </View>
        )
    }

    render(){
        
        return(
            
            <View style={styles.container}>
                {this.state.getcategorya && 
                    <this.HomeHeader></this.HomeHeader>
                }
                {this.state.getcategoryb &&(
                    
                    <FlatList style={styles.Category}
                    numColumns='2'
                    data={this.state.category}
                    renderItem={this.renderItem}
                    decelerationRate= {0.8}
                    disableIntervalMomentum={true}
                    scrollEventThrottle={16}
                    keyExtractor={item => item.id_category}
                    onEndReached={this.RefreshDataCategory}
                    onEndReachedThreshold={0.2}
                    
                    ListHeaderComponent={
                        <this.HomeHeader></this.HomeHeader>
                    }
                    ListFooterComponent={
                        <ActivityIndicator size="large" color="#00ff00" />
                    }
                    /> )
                }
                <Text style={{marginTop:30, marginLeft:30, position:'absolute'}}>{this.state.MaxHeight}</Text>

            </View>
        );
    }
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    ViewItem:{
        width: width/2 - 4,
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        borderWidth: 1,
        borderColor: '#bdbdbd',
      },
      ImgCategory:{
        width: "100%",
        height: 200,
        flex: 1,
      },
    Category:{
        width,
    },

    container: {
        flex: 1,
        backgroundColor:'#E5E5E5',
      },


});