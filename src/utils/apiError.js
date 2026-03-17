class apiError extends  Error{
  constructor(
    statusCode,
    massage= "somthing want wrong",
    error = [],
    stack = ""
  ){
    super(massage)
    this.statusCode = statusCode
    this.data = null
    this.massage = massage
    this.success =false;
    this.errors= error

    if(stack){
      this.stack=stack
    }
    else{
      Error.captureStackTrace(this,this.constructor)
    }
  }
}

export {apiError}