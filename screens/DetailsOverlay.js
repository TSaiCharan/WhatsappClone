import React,{useState} from 'react';
import {View,Text,StyleSheet,Button,TextInput} from 'react-native'
function DetailsOverlay(props){
    const [name,setName] = useState('');
    const [about,setAbout] = useState('');
    return(
    <View style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.inputContainer}>
                    <Text style={styles.containerText}>Enter Details:</Text>
                    <Text>Name:</Text>
                    <TextInput value={name} onChangeText={setName} maxLength={10} style={styles.input}/>
                </View>
                <View style={styles.ButtonContainer}>
                    <Button title="Verify" onPress={()=>{props.setToggleOverlay(!props.toggleOverlay)}}/>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:20,
        padding:10,
        marginTop:10,
        // width:'100%'
    },
    container:{
        height:'100%',
        width:'100%',
        backgroundColor:'red',
        position:'absolute',
        zIndex:7,
        justifyContent:'center',
        alignItems:'center'
    },
    containerText:{
        color:'black'
    },
    popup:{
        width:200,
        height:200,
        backgroundColor:'white',
        borderRadius:20,
        padding:20,
        alignItems:'center',
        justifyContent:'space-around'
    },
    inputContainer:{
        // height:80,
        // justifyContent:'space-between'
    },
})


export default DetailsOverlay;