module.exports=class ApiError extends Error{
    status;
    code;

    constructor(status,message,errors=[]){
        super(message);
        this.status=status;
        this.errors=errors;
    }

    static UnathorizedError(){
        return new ApiError(401,'Unathorized');
    }

    static BadRequest(message,errors=[]){
        return new ApiError(400,message,errors);
    }
}