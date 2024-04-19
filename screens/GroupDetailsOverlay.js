import React,{useState} from 'react'
import {View,Text,StyleSheet,TextInput,Button} from 'react-native'
import {connect} from 'react-redux';
import addGroupAction from '../redux/addGroupAction'

function GroupDetailsOverlay(props){

    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center',marginBottom:15,fontWeight:'bold',fontSize:18,}}>
                Group Details
            </Text>
            <TextInput placeholder='Enter Name' value={name} onChangeText={setName} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)'}}/>
            <TextInput placeholder='Description...' value={desc} onChangeText={setDesc} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)'}}/>
            <View style={{marginVertical:30,alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                <Button title="Cancel" onPress={()=>{props.setToggleOverlay(!props.toggleOverlay);}}/>
                <Button color="rgba(34,212,103,255)" title='Confirm' onPress={()=>{props.setToggleOverlay(!props.toggleOverlay);props.dispatch(addGroupAction({name:name,desc:desc,mem:props.selected}));props.navigation.navigate('Main')}}/>
            </View>
        </View>
    )
}
const mapStateToProps = (state)=>{
    return {
    state
    }
}
const styles = StyleSheet.create({
    container:{
        height:250,
        width:250,
        backgroundColor:'white',
        borderRadius:20,
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:[{translateX:-125},{translateY:-125}],
        zIndex:4,
        padding:20,
    }
})
export default connect(mapStateToProps)(GroupDetailsOverlay);