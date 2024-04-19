function addChatAction(payload){
    // console.log("Inside action",payload)
    return{
        type:'ADD_MSG',
        payload:payload
    }
}

export default addChatAction