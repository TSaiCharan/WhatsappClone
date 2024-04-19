import React from 'react';
import {Image,View,StyleSheet,StatusBar} from 'react-native';


function Welcome(props){

    setTimeout(()=>{props.navigation.replace('Login')},1000)
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={'rgba(33,38,45,255)'}/>
            {/* <Image style={styles.logo} source={require('../assets/images/logo.png')}/> */}
        </View>
    )
}   

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(33,38,45,255)'
    },  
    logo:{
        width:100,
        height:100,
        // transform:[{translateX:-50},{translateY:-50}]
    }
})

export default Welcome;