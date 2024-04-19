function addPhoneAction(payload){
    // console.log("Inside action",payload)
    return{
        type:'ADD_PHN',
        payload:payload
    }
}

export default addPhoneAction