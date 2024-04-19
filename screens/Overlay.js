import React,{useState} from 'react';
import {View,Text,StyleSheet,Button,TextInput} from 'react-native';
import DetailsOverlay from './DetailsOverlay';
import addPhoneAction from '../redux/addPhoneAction';
import {connect} from 'react-redux'
function Overlay(props){
    const [otp,setOtp] = useState(null);
    const [detailsToggle,setDetailsToggle] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.popup}>
                <View style={styles.inputContainer}>
                    <Text style={styles.containerText}>Verify OTP</Text>
                    <TextInput value={otp} onChangeText={setOtp} maxLength={4} keyboardType='number-pad' style={styles.input}/>
                </View>
                <View style={styles.ButtonContainer}>
                    <Button title="Verify" color="rgba(34,212,103,255)" onPress={()=>{props.dispatch(addPhoneAction({phone:props.phone,code:props.code}));props.setToggleOverlay(!props.toggleOverlay); props.navigation.replace('Main')}}/>
                </View>
            </View>
            {/* {detailsToggle?<DetailsOverlay toggleOverlay={props.toggleOverlay} setToggleOverlay={props.setToggleOverlay}/>:null} */}
        </View>
    )
}

const mapStateToProps = (state)=>{
    return {
    state
    }
}
const styles = StyleSheet.create({
    input:{
        borderBottomWidth:1,
        borderBottomColor:'rgba(62,122,114,255)',
        // borderRadius:20,
        padding:10,
        marginTop:10,
        // width:'100%'
    },
    container:{
        height:'100%',
        width:'100%',
        // backgroundColor:'black',
        position:'absolute',
        zIndex:7,
        justifyContent:'center',
        alignItems:'center',
        // elevation:10
        // opacity:0.5
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

export default connect(mapStateToProps)(Overlay);