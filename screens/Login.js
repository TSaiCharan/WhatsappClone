import React,{useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,Alert,StatusBar} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Overlay from './Overlay';
function Login(props){
    const [selectedValue,setSelectedValue] = useState('United States');
    const [number,setNumber] = useState('');
    const [toggleOverlay,setToggleOverlay] = useState(false);
    function handler(){
        if(false&&number.length!=10)
        {
            Alert.alert("Enter Valid Number")
        }
        else
        {
            setToggleOverlay(!toggleOverlay)
        }
    }
    return (
        
        <View style={styles.container}>
            <StatusBar backgroundColor={'rgba(6,94,84,255)'}/>
            <View>
                <View style={styles.headContainer}>
                    <Text style={styles.header}>Verify your phone number</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyHeader}>
                        <Text style={styles.bodyText}>Whatsapp will send an SMS message to verify your phone number.</Text>
                        <Text style={styles.bodyText}>Enter your country code and phone number:</Text>
                        <View style={styles.pickerContianer}>
                            <Picker style={styles.picker} selectedValue={selectedValue} onValueChange={(item)=>{setSelectedValue(item)}} mode='dropdown'>
                                <Picker.Item label="United States" value="US"/>
                                <Picker.Item label="India" value="India"/>
                                <Picker.Item label="Sri Lanka" value="SL"/>
                                <Picker.Item label="Pakistan" value="PAK"/>
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputTextContainer}>
                                <Text style={styles.inputText}>+{selectedValue=="United States"?1:(selectedValue=="SL"?94:92)}</Text>
                            </View>
                            <View style={styles.input_container}>
                                <TextInput keyboardType='number-pad' maxLength={10} style={styles.input} value={number} onChangeText={(num)=>setNumber(num)}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.Footer}>
                <Button title="Next" color="rgba(34,212,103,255)" onPress={handler}/>
                <Text style={styles.FooterText}>Carrier SMS charges may apply</Text>
            </View>
            {toggleOverlay?<View style={{height:'100%',width:'100%',backgroundColor:'black',position:'absolute',opacity:0.5}}></View>:null}
            {toggleOverlay?<Overlay phone={number} code={('+'+(selectedValue=="United States"?'1':(selectedValue=="SL"?'94':'92')))} toggleOverlay={toggleOverlay} setToggleOverlay={setToggleOverlay} navigation={props.navigation}/>:null}
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // borderWidth:1,
        justifyContent:'space-between',
        position:'relative'
    },
    body:{
        justifyContent:'space-between'
    },
    FooterText:{
        margin:10,
        fontWeight:'600'
    },
    Footer:{
        alignItems:'center',
        margin:30
    },
    headContainer:{
        alignItems:'center',
        margin:20,
       
    },
    header:{
        color:'rgba(62,123,104,255)',
        fontWeight:'600',
        fontSize:20
    },
    bodyContainer:{

    },
    bodyHeader:{
        padding:15,
        alignItems:'center'
    },
    bodyText:{
        fontWeight:'600',
        color:'#606060',
        textAlign:'center',
        paddingTop:5,
    },
    picker:{
        marginTop:10,
        width:300,
        
    },
    pickerContianer:{
        borderBottomWidth:2,
        borderBottomColor:'rgba(62,122,114,255)'
    },
    inputContainer:{
        flexDirection:'row',
        width:300,
        justifyContent:'space-between'
        // alignItems:'center'
    },
    input:{
        // color:'red',
        width:'100%',
        // textAlign:'center',
        color:'black',
        
        fontSize:18
    },
    inputText:{
        fontWeight:"bold",
        // borderWidth:1
        // color:'black',
        fontSize:18
    },
    inputTextContainer:{
        
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        borderBottomWidth:2,
        borderBottomColor:'rgba(62,122,114,255)',
        width:80,
        padding:5,
        
    },
    input_container:{
        paddingHorizontal:5,
        borderBottomWidth:2,
        width:200,
        borderBottomColor:'rgba(62,122,114,255)',
        alignItems:'center'
    }
})
export default Login;