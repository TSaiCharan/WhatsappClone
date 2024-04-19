function EditProfileAction(payload){
    // console.log("Inside action")
    return {
        type:'EDIT_PROFILE',
        payload:payload
    }
}

export default EditProfileAction