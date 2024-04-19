function addGroupAction(payload){
    console.log("Inside action")
    return {
        type:'ADD_GRP',
        payload:payload
    }
}

export default addGroupAction