import  mongoose,{schema}  from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new schema({
  videofile:{
    type:String,//url//
    required:true
  },
  thumbnail:{
      type:String,//url//
    required:true
    
  },
    title:{
      type:String,
       required:true
    
  },
    description:{
      type:String,
      required:true
    
  },
    duration:{
      type:Number,
    required:true
    
  },
  views:{
      type:Number,
      default:0
    
  },

  ispublished:{
    type:Boolean,
    default:true

  },
  owner:{
    type: Schema.types.ObjectId,
    ref: "user"

  }





},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const video =  mongoose.model("video",videoSchema)