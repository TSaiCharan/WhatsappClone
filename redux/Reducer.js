import axios from 'axios';
import { faker } from '@faker-js/faker';

let usersData=[]
let chatsData={}
let user = {
    name:faker.name.findName(),
    about:faker.lorem.sentence(5),
    img:`https://robohash.org/10`,
}
let n=20;

function fetch(flag){
    let chats = faker.lorem.sentences(n,'|');
    chats = chats.split('|');
    const dates = faker.date.betweens('2016-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z', n)
    const obj=[]
    for(let i=0;i<n;i++)
    {
        obj.push(
            {
                date:dates[i],
                chat:chats[i],
                sender:flag
            }
        )
    }
    return obj
    
}

let names = [],images=[],ids=[];
for(let i=0;i<n;i++)
names.push(faker.name.findName());
for(let i=0;i<n;i++)
images.push(faker.image.avatar());
for(let i=0;i<n;i++)
ids.push(faker.random.numeric(5))
for(let i=0;i<n;i++)
{
    usersData.push(
        {
            name:names[i],
            imageUrl:`https://robohash.org/${i}`,
            id:'C'+ids[i],
        }
    )
}
for(let i=0;i<usersData.length;i++)
{
    let temp = [...fetch(0),...fetch(1)];
    temp.sort((a, b) => {return new Date(a.date) - new Date(b.date)})
    chatsData[usersData[i].id] = temp;  
}

for(let i=0;i<usersData.length;i++)
{
    usersData[i].lastInteracted = chatsData[usersData[i].id][chatsData[usersData[i].id].length-1].date;
    // console.log(usersData[i].lastInteracted,233234);
}
usersData.sort((a,b)=>(a.lastInteracted - b.lastInteracted)*-1)
// axios({
//     method:'get',
//     url:'https://randomuser.me/api/?nat=gb&results=50'
//     }).then(({data})=>{for(let i=0;i<data.results.length;i++)
//     {
//         usersData.push({
//             name:data.results[i].name.first+' '+data.results[i].name.last,
//             imageURL:data.results[i].picture.medium,
//             id:data.results[i].login.userName
//         })
//     }
//     }).then(()=>{
//     for(let i=0;i<usersData.length;i++)
//     {
//         chatsData[usersData[i].id] = [...fetch(0),...fetch(1)];
//     }
//     initialState={
//         usersData:usersData,
//         chatsData:chatsData
//     }
//     console.log(initialState,700)
// });

const initialState = {
    usersData:usersData,
    chatsData:chatsData,
    user:user
}

// usersData.push(
//     {
//         name:names[i],
//         imageUrl:images[i],
//         id:ids[i]
//     }
// )

// chatsData[usersData[i].id] = temp;

// obj.push(
//     {
//         date:dates[i],
//         chat:chats[i],
//         sender:flag
//     }
// )
console.log(usersData   )
export default function Reducer(state=initialState,action){
    
    // let 
    switch(action.type)
    {
        case 'ADD_MSG':{ 
            let id=action.payload.id;
            let msg=action.payload.msg;
            
            let temp1 = {...state.chatsData}
            if(temp1[id]==undefined)
            temp1[id] = []
            temp1[id].push(msg)
            let temp2 = [...state.usersData]
            temp2=temp2.map((el)=>{
                if(el.id==id)
                {
                    return {
                        ...el,
                        lastInteracted:msg.date
                    }   
                }
                else
                return el
            })
            temp2.sort((a,b)=>(a.lastInteracted - b.lastInteracted)*-1)
            return {
                ...state,
                usersData:temp2,chatsData:temp1
        }
    }
    
    case 'ADD_PHN':{
        return {
            ...state,user:{
                ...state.user,phone:action.payload.code+' '+(action.payload.phone||'9876543210')
            }
        }
    }
    case 'ADD_GRP':{
        
        let temp =[ ...state.usersData,
        {
            id:'G'+faker.random.numeric(5),
            mem:action.payload.mem,
            lastInteracted:new Date(),
            name:action.payload.name,
            description:action.payload.desc,
            imageUrl:'https://lh3.googleusercontent.com/ABlX4ekWIQimPjZ1HlsMLYXibPo2xiWnZ2iny1clXQm2IQTcU2RG0-4S1srWsBQmGAo'
        }]
        
        temp.sort((a,b)=>(a.lastInteracted - b.lastInteracted)*-1)
        
        return {
            ...state,usersData:[...temp]

        }
    }
    case 'EDIT_PROFILE':{
        let temp={...state.user};
        console.log(action.payload,909)
        console.log(temp,7272)
        if(action.payload.img!=undefined)
        {
            console.log(action.payload,839839)
            temp = {...temp,img:action.payload.img}
        }
        else
        {
            temp = {
                ...temp,
                name:action.payload.name,
                about:action.payload.about
            }
        }
        console.log(temp,7273)
        return {
            ...state,user:{
                ...state.user,
                ...temp
            }
        }
    }
    default:return {...state}
    }
    
}