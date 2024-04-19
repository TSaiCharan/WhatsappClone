import React,{useState,useRef} from 'react';
import {View,Text,StyleSheet,Pressable,TextInput,ScrollView,Image,Button,Alert,FlatList,StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import GroupDetailsOverlay from './GroupDetailsOverlay';

function Group(props){
    const [searchText,setSearchText] = useState('');
    function SearchUser(txt){
        setSearchText(txt)
    }
    const [users,setUsers] = useState(props.state.usersData.filter((el)=>el.id.substring(0,1)!='G').sort((a,b)=>{if(a.name<b.name)return -1;else if(a.name>b.name)return 1;else return 0;}));
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
            setUsers(props.state.usersData.sort((a,b)=>{if(a.name<b.name)return -1;else if(a.name>b.name)return 1;else return 0;}))
            // usersTemp = props.state.usersData
        }
        setSearchText(el);
    }
    let temp1 = props.state.usersData,temp2={};
    for(let i in temp1)
    {
        temp2[temp1[i].id] = false;
    }  
    const [refs,setRefs] = useState(temp2);
    const [selected,setSelected] = useState([])
    function handler(id){
        let temp = {...refs};
        temp[id] = !temp[id]
        setRefs(temp)
        if(temp[id])
        setSelected([...selected,id]);
        else
        setSelected(selected.filter((el)=>el!=id))
    } 
    const [toggleOverlay,setToggleOverlay] = useState(false);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
            <View style={styles.searchHeader}>
            <Pressable onPress={()=>{props.navigation.goBack()}}>
                <Icon name="arrow-left" size={20} color="grey"/>
            </Pressable>
            <TextInput style={styles.search} value={searchText} onChangeText={SearchUser} placeholderTextColor="grey" placeholder='Add Participants...'/>
            </View>
            
            {(selected.length!=0)?<View style={{height:80,padding:10}}>
                <ScrollView horizontal={true}>
                {selected.map((el)=><Pressable key={el} onPress={()=>{handler(el)}}><View style={{paddingHorizontal:10,position:'relative'}}><Image style={{width:50,height:50,borderRadius:25,}} source={{uri:props.state.usersData.filter((ele)=>ele.id==el)[0].imageUrl}}/><View style={{backgroundColor:'rgb(166, 166, 166)',borderRadius:10,position:'absolute',bottom:0,right:0,padding:3}}>
                            <Icon1 name="close" size={15} color="black"/>
                        </View></View></Pressable>)}
            </ScrollView></View>:null}
            {users.length==0?null:<FlatList style={styles.body}
            data={users}
            renderItem={({item})=>(<Pressable style={styles.card} onPress={()=>{handler(item.id)}}>
                    <View style={{flex:1,alignItems:'center',position:'relative'}}>
                        <Image style={{width:50,height:50,borderRadius:25}}source={{uri:item.imageUrl}}/>
                        {refs[item.id]?<View style={{backgroundColor:'#02867a',borderRadius:10,position:'absolute',bottom:0,right:0}}>
                            <Icon1 name="check" size={20} color="white"/>
                        </View>:null}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:5,paddingHorizontal:5}}>
                        <Text style={{fontWeight:'bold'}}>{item.name}</Text>
                    </View>
                    </Pressable>)
            }
            />}
            {/* <ScrollView style={styles.body}>
                {users.length!=0?users.map((el)=>{return (<Pressable style={styles.card} onPress={()=>{handler(el.id)}}>
                    <View style={{flex:1,alignItems:'center',position:'relative'}}>
                        <Image style={{width:50,height:50,borderRadius:25}}source={{uri:el.imageUrl}}/>
                        {refs[el.id]?<View style={{backgroundColor:'#02867a',borderRadius:10,position:'absolute',bottom:0,right:0}}>
                            <Icon1 name="check" size={20} color="white"/>
                        </View>:null}
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',flex:5,paddingHorizontal:5}}>
                        <Text style={{fontWeight:'bold'}}>{el.name}</Text>
                    </View>
                    </Pressable>)}):null}
                    
            </ScrollView> */}
            <View style={styles.footer}>
                {selected.length!=0?<Pressable style={{backgroundColor:'#01796b',padding:10,borderRadius:25}} onPress={()=>{setToggleOverlay(true);}}><Icon1 name="arrowright" size={25} color="white"/></Pressable>/*<Button title='Next' color='rgba(34,212,103,255)'  onPress={()=>{
                        setToggleOverlay(true);
                }}/>*/:null}
            </View>
            {toggleOverlay?<View style={{height:'100%',width:'100%',backgroundColor:'black',position:'absolute',opacity:0.5,zIndex:4}}></View>:null}
            {toggleOverlay?<GroupDetailsOverlay toggleOverlay={toggleOverlay} selected={selected} setToggleOverlay={setToggleOverlay} navigation={props.navigation}/>:null}
        </View>
    )
}

const mapStateToProps = (state)=>{
    return {
    state
    }
}

const styles = StyleSheet.create({
    footer:{
        position:'absolute',
        zIndex:3,
        bottom:20,
        right:10,
        borderRadius:10
    },
    search:{
        color:'black',
        paddingLeft:30
        
        
    },
    container:{
        flex:1,
        // borderWidth:1,
        position:'relative',
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
    card:{
        flexDirection:'row',
        padding:10,
        marginVertical:10,
        alignItems:'center',
        flex:1,
        // borderWidth:1

    },
    body:{
        
        // position:'relative',
        backgroundColor:'#eeeeee'
    }
})
export default connect(mapStateToProps)(Group);