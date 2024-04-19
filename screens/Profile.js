import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image,Pressable,Alert,TextInput,Button,Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import { faker } from '@faker-js/faker';
import {connect} from 'react-redux'
// import { RNCamera } from 'react-native-camera';
// import EditProfileOverlay from './EditProfileOverlay';
import EditProfileAction from '../redux/EditProfileAction';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function Profile(props){
    const [resource,setresource] = useState('');
    const [imageToggle,setImageToggle] = useState(false);
    function cameraLaunch() {
    
        let options = {
          storageOptions: {
            saveToPhotos:true,
            skipBackup: true,
            path: 'images',
          },
        };
        launchCamera(options, (response) => {
          console.log('Response = ', response);
          
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            
            // setresource({
            //   filePath: response,
            //   fileData: response.data,
            //   fileUri: response.assets[0].uri
            // });
            
            console.log(response.assets[0].uri)
            props.dispatch(EditProfileAction({img:response.assets[0].uri}))
          }
        });
      }
      // cameraLaunch();
      function launchImage() {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            setresource({
              filePath: response,
              fileData: response.data,
              fileUri: response.assets[0].uri
            });
            
            console.log(response.assets[0].uri)
            props.dispatch(EditProfileAction({img:response.assets[0].uri}))
          }
        });
    
      }
    const [nametoggleOverlay,setNameToggleOverlay] = useState(false);
    const [aboutToggleOverlay,setAboutToggleOverlay] = useState(false);
    const [name,setName] = useState(null)
    const [about,setAbout] = useState(null)
    const [buttonsToggle,setButtonsToggle] = useState(true)
    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow',()=>{
            setButtonsToggle(false);
        })
        Keyboard.addListener('keyboardDidHide',()=>{
            setButtonsToggle(true);
        })
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={()=>{props.navigation.goBack()}}><Icon1 name="arrowleft" size={25} color="white"/></Pressable>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.body}>
                <View style={{position:'relative',alignSelf:'center',borderRadius:150,marginVertical:30}}>
                  <Image style={styles.dp} source={{uri:props.state.user.img}}/>
                  <Pressable style={{backgroundColor:'#01796b',padding:10,borderRadius:25,position:'absolute',right:10,bottom:10}} onPress={()=>{setImageToggle(!imageToggle)}}><Icon1 name="camera" size={25} color="white"/></Pressable>
                </View>
                <View style={styles.bodyUserName}>
                    {nametoggleOverlay?<TextInput placeholder='Enter Name...' value={name} onChangeText={setName} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)',width:'100%'}}/>:<><Text style={styles.bodyUsernameText}>{props.state.user.name}</Text>
                    <Pressable onPress={()=>{setNameToggleOverlay(true)}}>
                        <Icon2 name="edit" size={20} color="rgba(6,94,85,255)"/>
                    </Pressable></>}
                </View>
                <View style={styles.bodyAbout}>
                    <View style={styles.bodyAboutHeader}>
                        <Text style={styles.bodyAboutHeaderText}>About and phone number</Text>
                        {aboutToggleOverlay?null:<Pressable onPress={()=>{setAboutToggleOverlay(true)}}>
                            <Icon2 name="edit" size={20} color="rgba(6,94,85,255)"/>
                        </Pressable>}
                    </View>
                    {aboutToggleOverlay?<TextInput placeholder='Enter About...' value={about} onChangeText={setAbout} style={{borderBottomWidth:2,borderBottomColor:'rgba(62,122,114,255)',width:'100%'}}/>:<Text style={styles.bodyAboutText}>{props.state.user.about}</Text>}
                    <Text style={styles.bodyPhoneText}>{props.state.user.phone}</Text>
                </View>
                
            </View>
            {(aboutToggleOverlay||nametoggleOverlay)&&buttonsToggle?<View style={styles.buttonContainer}>
                <Button title='Reset' onPress={()=>{setAboutToggleOverlay(false);setNameToggleOverlay(false)}}/>
                <Button title='Save' color='rgba(34,212,103,255)' onPress={()=>{props.dispatch(EditProfileAction({name:(name||props.state.user.name),about:(about||props.state.user.about)}));setAboutToggleOverlay(false);setNameToggleOverlay(false)}}/>
            </View>:null}
            {imageToggle?<View style={{width:'100%',position:'absolute',backgroundColor:'white',bottom:5,height:75,}}><Text style={{textAlign:'center',fontSize:18,fontWeight:'700'}}>Profile Photo</Text>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
              <Pressable style={{margin:10,alignItems:'center'}} onPress={()=>{setImageToggle(false);cameraLaunch();}}>
              <Icon1 name="camera" size={25} color="#01796b"/>
              <Text>Camera</Text>
              </Pressable> 
              <Pressable style={{margin:10,alignItems:'center'}} onPress={()=>{setImageToggle(false);launchImage()}}>
              <Icon name="photo" size={25} color="#01796b"/>
              <Text>Gallery</Text>
              </Pressable> 

            </View>
            </View>:null}
            {/* <RNCamera captureAudio={false} style={{flex: 1}} type={RNCamera.Constants.Type.back} androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} /> */}
            {/* <Text>Hello Profile</Text> */}
            {/* {toggleOverlay?<View style={{height:'100%',width:'100%',backgroundColor:'black',position:'absolute',opacity:0.5,zIndex:4}}></View>:null}
            {toggleOverlay?<EditProfileOverlay toggleOverlay={toggleOverlay} setToggleOverlay={setToggleOverlay} navigation={props.navigation}/>:null} */}
        </View>
    )
}

const mapStateToProps = (state)=>{
    return {state}
}
const styles = StyleSheet.create({
    buttonContainer:{
        position:'absolute',
        bottom:25,
        // right:20,
        flexDirection:"row",
        // borderWidth:1,
        width:'100%',
        padding:10,
        justifyContent:'space-between'
    },
    container:{
        flex:1,
        backgroundColor:'rgba(239,239,238,255)',
        position:'relative'
    },
    bodyAboutHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:20,
        // borderWidth:1,
        alignItems:'center',
        marginBottom:20
    },
    bodyUserName:{
        backgroundColor:'rgba(255,254,254,255)',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignItems:'center',
        marginVertical:20
    },
    bodyAbout:{
        backgroundColor:'rgba(255,254,254,255)',
        // height:60,
        padding:20,
        // justifyContent:'center',
        // alignItems:'center',
        marginVertical:20
    },
    bodyUsernameText:{
        color:'black',
        fontSize:28,
        fontWeight:'500'
    },
    bodyAboutText:{
        color:'black',
        // fontSize:16,
        paddingBottom:20,
        borderBottomWidth:1,
        borderBottomColor:'#b8b9b8'
    },
    bodyPhoneText:{
        color:'black',
        fontSize:18,
        paddingTop:20,
    },
    bodyAboutHeaderText:{
        fontSize:18,
        color:'rgba(15,90,83,255)',
        fontWeight:'600',
        // paddingBottom:10
    },
    dp:{
        width:200,
        height:200,
        borderRadius:150,
        alignSelf:'center',
        // marginVertical:30
    },
    header:{
        backgroundColor:'rgba(6,94,84,255)',
        height:65,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
    },
    body:{
        backgroundColor:'rgba(239,239,238,255)'
    },
    headerText:{
        fontWeight:'500',
        color:'white',
        fontSize:20,
        // paddingLeft:10,
        marginLeft:30
    },

})
export default connect(mapStateToProps)(Profile);