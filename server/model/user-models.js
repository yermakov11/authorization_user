const{Schema,model}=require('mongoose');

const UserSchema= new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    isActivated:{type:Boolean,required:true},
    activationLink:{type:String}
});

module.exports=model('User',UserSchema);