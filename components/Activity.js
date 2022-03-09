import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet,Dimensions } from 'react-native';
let width = Dimensions.get('window').width;
class Activity extends Component {
   state = { animating: true }
   
   closeActivityIndicator = () => setTimeout(() => this.setState({
   animating: false }), 3000)
   
   componentDidMount = () => this.closeActivityIndicator()
   render() {
      const animating = this.state.animating
      return (
            <ActivityIndicator
               animating = {animating}
               color = '#08d4c4'
               size = "large"
               style = {styles.activityIndicator}/>

      )
   }
}
export default Activity

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   activityIndicator: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 90,
      position:'absolute',
      top:120,
      textAlign:'center',
      left:width*0.4,
      zIndex:10
   }
})