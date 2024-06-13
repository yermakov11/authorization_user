const jwt=require('jsonwebtoken');
const tokenModel=require('../model/token-model');

class TokenService{
    generateToken(payload){
        const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_TOKEN,{expiresIn:'30m'});
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH_TOKEN,{expiresIn:'30d'});
        return{
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try {
            const userData=jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData=jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
            return userData;
        } catch (error) {
            return null;
        }
    }
    async saveToken(userId,refreshToken) {
        const tokenData=await tokenModel.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token=await tokenModel.create({user:userId,refreshToken});
        return token;
    }
    async deleteToken(refreshToken){
        return await tokenModel.deleteOne({refreshToken});
    }
    async findToken(refreshToken){
        const tokenData=await tokenModel.findOne({refreshToken});
        return tokenData;
    }
}

module.exports = new TokenService();