const userService=require('../service/userService');
const {validationResult, body}=require('express-validator');
const AppiError=require('../exceptions/errorApi')
class UserController{
    async registration(req,res,next){
        try {
            const error=validationResult(req);
            if(!error.isEmpty()){
                return next(AppiError.BadRequest('erorr validation ', error.message));    
            }
            const{email,password}=req.body;
            const userData=await userService.registration(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*1000,httpOnly:true});
            return res.json(userData);
        } catch (error) {
           next(error);
        }
    }
    async login(req,res,next){
        try {
            const{email,password}=req.body;
            const userData=await userService.login(email,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*1000,httpOnly:true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(req,res,next){
        try {
            const{refreshToken}=req.cookie;
            const token=await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            next(error);
        }
    }
    async activate(req,res,next){
        try {
            const activateLink=req.params.link;
            await userService.activate(activateLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error)
        }
    }
    async refresh(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req,res,next){
        try {
            const users=await userService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();