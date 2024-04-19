import React,{useState} from 'react'
import {View,Text,StyleSheet,TextInput,Button} from 'react-native'
import {connect} from 'react-redux';

import EditProfileAction from '../redux/EditProfileAction';
function EditProfileOverlay(props){

    const [name,setName] = useState(props.state.user.name)
    const [about,setAbout] = useState(props.state.user.about)
    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center',marginBottom:15,fontWeight:'bold',fontSize:18,}}>
                Edit Details
            </Text>
            <TextInput placeholder='Enter Name' value={name} onChangeText={setName} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)'}}/>
            <TextInput placeholder='Description...' value={about} onChangeText={setAbout} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)'}}/>
            <View style={{marginVertical:30,alignItems:'center'}}>
                <Button color="rgba(34,212,103,255)" title='Confirm' onPress={()=>{props.setToggleOverlay(!props.toggleOverlay);props.dispatch(EditProfileAction({name:name,about:about}));props.navigation.navigate('Profile')}}/>
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
        width:400,
        backgroundColor:'white',
        borderRadius:20,
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:[{translateX:-200},{translateY:-125}],
        zIndex:4,
        padding:20,
    }
})
export default connect(mapStateToProps)(EditProfileOverlay);