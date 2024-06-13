const ApiError=require('../exceptions/errorApi');
module.exports=function(err,req, res, next){
    console.log(err);
    if(err instanceof ApiError){
        res.status(err.status).json({message:err.message,errors:err.errors});
    }
    return res.status(err.status).json({message:'some error'});
}