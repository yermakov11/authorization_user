const ApiError=require('../exceptions/errorApi');
const tokenService=require('../service/tokenService');
module.exports=function(req, res, next){
   try {
        const authorixationHeader=req.headers.authorization;
        if(!authorixationHeader){
            return next(ApiError.UnathorizedError());
        }
        const accessToken=authorixationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnathorizedError());
        }
        const userData=tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnathorizedError());
        }
        req.user=userData;
        next();
   } catch (error) {
      return next(ApiError.UnathorizedError());
   }
}