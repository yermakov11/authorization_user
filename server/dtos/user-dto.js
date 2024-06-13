module.exports=class UserDto{
    email;
    id;
    isActivated;
    constructor(email,id,isActivated){
        this.email=email;
        this.id=id;
        this.isActivated=isActivated;
    }
}