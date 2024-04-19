import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Button,Image,ScrollView,Alert,Pressable,TextInput,FlatList,StatusBar} from 'react-native';
// import { createIconSet } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
// import { useEffect } from 'react/cjs/react.production.min';
import axios from 'axios';
import {connect} from 'react-redux';
import Dropdown from './dropdown';
import { template } from '@babel/core';

function Main(props){
    // const [selectedValue,setSelectedValue] = useState('');
    // const [users,setUsers] = useState(null)
    // let users = props.state.usersData
    // console.log(props.state,999)
    // useEffect(()=>{ 
    //     axios({
    //         method:'get',
    //         url:'https://randomuser.me/api/?nat=gb&results=50'
    //     }).then((response)=>{setUsers([...response.data.results])})
    // },[]);
    const [dropToggle,setDropToggle] = useState(false);
    const [searchToggle,setSearchToggle] = useState(false)
    const [searchText,setSearchText] = useState('');
    let usersTemp = [...props.state.usersData]
    // console.log(usersTemp,37373)    
    // console.log(usersTemp,7777)
    // usersTemp.sort((a,b)=>(a.lastInteracted - b.lastInteracted)*-1)
    // console.log(usersTemp,7777)
    // console.log(7878)
    const [users,setUsers] = useState([...usersTemp]);
    const [flag,setFlag] = useState(false);
    // if(props.hi!=undefined)
    // setUsers(usersTemp)
    function SearchUser(el){
        if(el!='')
        {
            // console.log("Inside searchUser")
            // console.log(users.length,90)
            setUsers(props.state.usersData.filter((obj)=>{return (obj.name.toLowerCase().includes(el.toLowerCase()))}))
            // usersTemp = props.state.usersData.filter((obj)=>{return (obj.name.toLowerCase().includes(el.toLowerCase()))})
            // console.log(users.length,100);
        }
        else
        {
            setUsers(props.state.usersData)
            // usersTemp = props.state.usersData
        }
        setSearchText(el);
    }   
    function handler(id){
        props.navigation.navigate('Chat',{id:id});
    }
    
    return (
        <View style={styles.container}>
            <View style={searchToggle?styles.searchHeader:styles.header}>
                {searchToggle?<><StatusBar barStyle={'dark-content'} backgroundColor={'white'}/><Pressable onPress={()=>{setSearchText('');setUsers(props.state.usersData);setSearchToggle(!searchToggle)}}><Icon name="arrow-left" size={20} color="grey"/></Pressable><TextInput style={styles.search} value={searchText} onChangeText={SearchUser} placeholderTextColor="grey" placeholder='Search...'/></>:(<><StatusBar backgroundColor={'rgba(6,94,84,255)'}/><Text style={styles.headerText}>WhatsApp</Text>
                <View style={styles.iconContainer}>
                    {/* <Button title="Search"/> */}
                    {/* <Pressable onPress={()=>{setFlag(!flag)}}><Text>Reload</Text></Pressable> */}
                    <Pressable onPress={()=>{setSearchToggle(!searchToggle)}}><Icon name="search" size={20} color="white"/></Pressable>
                    <Pressable onPress={()=>{setDropToggle(!dropToggle)}}><Icon name="ellipsis-v" size={20} color="white"/></Pressable>
                    {/* <Picker style={{width:30}}selectedValue={selectedValue} onValueChange={(item)=>{setSelectedValue(item)}} mode='dropdown'>
                            <Picker.Item  label="New Group" value="New Group"/>
                            <Picker.Item label="Profile" value="Profile"/>
                    </Picker> */}
                    {/* <Button title="Options"/> */}
                </View></>)}
            </View>
            {/* <ScrollView style={styles.body}>
                {(searchToggle?users:usersTemp).length!=0?(searchToggle?users:usersTemp).map((el)=><Pressable style={styles.card} onPress={()=>{handler(el.id)}}>
                    <View style={{flex:1}}><Image style={{width:50,height:50,borderRadius:25}}source={{uri:el.imageUrl}}/></View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:5}}>
                    <Text style={{fontWeight:'bold'}}>{el.name}</Text>
                    <Text style={{fontSize:10}}>{el.lastInteracted.getDate()+'/'+(el.lastInteracted.getMonth()+1)+'/'+el.lastInteracted.getFullYear()}</Text>
                    </View>
                    </Pressable>):null}
                    {dropToggle?<View style={styles.drop}>
                        <Pressable style={styles.dropItems} onPress={()=>{setDropToggle(!dropToggle);props.navigation.navigate('Profile')}}><Text style={{fontSize:16}}>Profile</Text></Pressable>
                        <Pressable style={styles.dropItems} onPress={()=>{setDropToggle(!dropToggle);props.navigation.navigate('Group')}}><Text style={{fontSize:16}}>New Group</Text></Pressable>
                    </View>:null}
            </ScrollView> */}
            <View style={styles.body}>
            <FlatList
            data={(searchToggle?users:usersTemp)}
            renderItem={({item})=>(<Pressable style={styles.card} onPress={()=>{setDropToggle(false);handler(item.id)}}>
                
            <View style={{flex:1}}><Image style={{width:50,height:50,borderRadius:25}}source={{uri:item.imageUrl}}/></View>
            <View style={{flex:5,}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{fontSize:10}}>{item.lastInteracted.getDate()+'/'+(item.lastInteracted.getMonth()+1)+'/'+item.lastInteracted.getFullYear()}</Text>
            </View>
            {props.state.chatsData[item.id]!=undefined?<View><Text>{(props.state.chatsData[item.id][props.state.chatsData[item.id].length-1].sender==0?'You: ':'')+props.state.chatsData[item.id][props.state.chatsData[item.id].length-1].chat.substring(0,10)+(props.state.chatsData[item.id][props.state.chatsData[item.id].length-1].chat.length>=10?'...':'')}</Text></View>:null}
            </View>
            </Pressable>)} />
            {dropToggle?<View style={styles.drop}>
                        <Pressable style={styles.dropItems} onPress={()=>{setDropToggle(!dropToggle);props.navigation.navigate('Profile')}}><Text style={{fontSize:16}}>Profile</Text></Pressable>
                        <Pressable style={styles.dropItems} onPress={()=>{setDropToggle(!dropToggle);props.navigation.navigate('Group')}}><Text style={{fontSize:16}}>New Group</Text></Pressable>
                    </View>:null}
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
    dropItems:{
        padding:10,
        flexDirection:'row',
        // justifyContent:'center',

        // borderBottomWidth:1,
        // borderBottomColor:'grey'
    },
    drop:{
        padding:10,
        zIndex:3,
        position:'absolute',
        right:2,
        top:2,
        // borderWidth:1,
        // backgroundColor:'white',
        backgroundColor:'#eeeeee',
        // borderWidth:2,
        borderRadius:5,
        // height:150,
        width:'50%',
        
        
        
        // shadowRadius:5,
        elevation:50
        // height:80,

    },
    searchHeader:{
        backgroundColor:'white',
        height:65,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f3'
    },
    iconContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between', 
        width:50
    },
    search:{
        color:'black',
        paddingLeft:30
        // fontSize:15,
        
    },
    container:{
        flex:1,
        position:'relative'
    },
    header:{
        backgroundColor:'rgba(6,94,84,255)',
        height:65,
        padding:10,
        flexDirection:'row',
        alignItems:'center',    
        justifyContent:'space-between',
        flex:1
    },
    headerText:{
        color:'white',
        fontSize:20,
        fontWeight:'600'
    },
    card:{
        flexDirection:'row',
        padding:10,
        marginVertical:10,
        alignItems:'center',
        flex:1,
        // borderWidth:1

    },
    body:{
        flex:15,
        position:'relative',
        backgroundColor:'#eeeeee'
    }
})
export default connect(mapStateToProps)(Main);