import React,{useState,useRef,useEffect} from 'react';
import {Text,View,StyleSheet,ScrollView,Image,TextInput,Pressable,Alert,FlatList,Keyboard} from 'react-native';
import { faker } from '@faker-js/faker';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
// import { transform } from '@babel/core';
import addChatAction from '../redux/addChatAction'
import Date_Con from './date';
function Chat(props){
    let ref = useRef();
    // function fetch(flag){
    //     let chats = faker.lorem.sentences(10,'|');
    //     chats = chats.split('|');
    //     const dates = faker.date.betweens('2016-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', 10)
    //     // console.log(dates,10);
        
    //     const obj=[]
    //     for(let i=0;i<10;i++)
    //     {
    //         obj.push(
    //             {
    //                 date:dates[i],
    //                 chat:chats[i],
    //                 id:flag
    //             }
    //         )
    //     }
    //     // console.log(obj,23);
    //     return obj
    //     // return chats.split('|');
        
    // }
    
    // fetch();
    // const [host,setHost] = useState(fetch(0));
    // const [friend,setFriend] = useState(fetch(1));
    // console.log(hostUser)
    // hostUser.map((el)=>{console.log(el)})
    // const text=faker.lorem.sentence();
    // let qwe=[...host,...friend];
    // let ids=[];
    // for(let i=0;i<props.state.usersData.length;i++)
    // {
    //     ids.push(props.state.usersData[i].id)
    // }
    
    let id=props.route.params.id
    // console.log(id,8282)
    const  person = props.state.usersData.filter((el)=>{return el.id==id})[0]
    const img_url = person.imageUrl
    const name = person.name;
    const [text,setText] = useState('');
    const [containerHeight,setContainerHeight] = useState(0);
    const [headerHeight,setHeaderHeight] = useState(0);
    const [footerHeight,setFooterHeight] = useState(0);
    const [h,setH] = useState(0);
    // console.log("rerender",props.state.chatsData[ids[8]].length)
    // console.log(img_url,8729);
    function layoutContainer({nativeEvent}){
        // console.log(nativeEvent.layout.height,10)
        setContainerHeight(nativeEvent.layout.height)
    }
    function layoutHeader({nativeEvent}){
        // console.log(nativeEvent.layout.height,11)
        setHeaderHeight(nativeEvent.layout.height)
    }
    function layoutFooter({nativeEvent}){
        // console.log(nativeEvent.layout.height,12)
        setFooterHeight(nativeEvent.layout.height)
    }
    return (
        <View style={styles.container} onLayout={layoutContainer}>
            <View style={styles.header} onLayout={layoutHeader}>
            <Pressable onPress={()=>{props.navigation.navigate('Main')}}>
                <Icon1 name="arrowleft" size={25} color="white"/>
            </Pressable>
            <Image style={{width:50,height:50,borderRadius:25,margin:5}}source={{uri:img_url}}/>
            <Text style={styles.headerText}>{name}</Text>
            </View>
            <View style={{...styles.body,height:( containerHeight - headerHeight - footerHeight)}}>
            {/* <ScrollView  ref={ref}  onContentSizeChange={(w,h)=>{setTimeout(()=>{ref.current.scrollToEnd({animated:false})},1)}}> */}
                {/* {console.log({...host,...friend})}
                {temp({...host,...friend}).map((el)=><Text style={el.substring(el.length-1,el.length)=='0'?styles.hostCard:styles.friendCard}>{el.substring(0,el.length-1)}</Text>)} */}
                {/* {temp(host).map((el)=><Text style={styles.hostCard}>{el}</Text>)}
                {temp(friend).map((el)=><Text style={styles.friendCard}>{el}</Text>)} */}
                {}
                {/* {(()=>{qwe.sort((a, b) => {return new Date(a.date) - new Date(b.date)})})()} */}
                {/* {props.state.chatsData[id]!=undefined?props.state.chatsData[id].map((el)=><View style={el.sender==0?styles.hostChatCardContainer:styles.friendChatCardContainer}>
                    <View style={el.sender==0?styles.hostCard:styles.friendCard}>
                        <Text style={{fontWeight:'400',fontSize:15}}>{el.chat}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,marginHorizontal:5}}><Text style={{fontSize:12,}}>{Date_Con(el.date).split(' ')[1]}</Text><Text style={{fontSize:12}}>{Date_Con(el.date).split(' ')[0]}</Text></View>
                    </View>
                </View>):null} */}
             {/* </ScrollView> */}
             {props.state.chatsData[id]==undefined?null:<FlatList
             inverted
             data={[...props.state.chatsData[id]].reverse()}
             renderItem={({item})=><View style={item.sender==0?styles.hostChatCardContainer:styles.friendChatCardContainer}>
             <View style={item.sender==0?styles.hostCard:styles.friendCard}>
                 <Text style={{fontWeight:'400',fontSize:15}}>{item.chat}</Text>
                 <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:5,marginHorizontal:5}}><Text style={{fontSize:12}}>{Date_Con(item.date).split(' ')[0]}</Text></View>
             </View>
         </View>}
         ref={ref}

             />}
             
            </View> 
            <View style={styles.footer} onLayout={layoutFooter}>
                <TextInput style={styles.footerInp} placeholder='Type a message' value={text} onChangeText={setText}/>
                <Pressable style={styles.icon} onPress={()=>{let obj={id:id,msg:{date:new Date(),chat:text,sender:0}}; props.dispatch(addChatAction(obj));setText('')}} disabled={text==''}>
                    <Icon2 name="send" size={25} color="white"/>
                </Pressable>
            </View>
        </View>
        
    )
}
// let styleObj=
//height:( containerHeight - headerHeight - footerHeight)
const mapStateToProps = (state)=>{
    return {
    state
    }
}
const styles = StyleSheet.create({
    icon:{
        backgroundColor:'#01796b',
        padding:10,
        borderRadius:25
    },
    container:{
        flex:1,
        // position:'relative'
    },
    header:{
        backgroundColor:'rgba(6,94,84,255)',
        height:65,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        // flex:1
    },
    headerText:{
        fontWeight:'600',
        color:'white',
        fontSize:18,
        paddingLeft:10
    },
    hostChatCardContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    friendChatCardContainer:{
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    body:{
        backgroundColor:'#ebe3da',
        // paddingTop:10,
        // flex:15
    },
    hostCard:{
        backgroundColor:'#e2ffc7',
        margin:10,
        borderRadius:20,
        padding:10,
        // float:'right'
    },
    friendCard:{
        backgroundColor:'#fefeff',
        margin:10,
        borderRadius:20,
        padding:10,
        // float:'left'
    },
    footer:{
        // position:'absolute',
        // bottom:0,
        // paddingHorizontal:10,
        padding:10,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:70,
        backgroundColor:'#ebe3da',
        // borderWidth:1
        // flex:1,

        // zIndex:20
        // backgroundColor:'#ebe3da'
        // transform:[{translateX:}]
        // top:0,
        // left:0
    },
    footerInp:{
        borderWidth:1,
        borderColor:'white',
        backgroundColor:'#fefeff',
        borderRadius:30,
        width:'85%',
        padding:15
    }

})


export default connect(mapStateToProps)(Chat);