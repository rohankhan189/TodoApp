const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const notesSchema = new Schema(
    {
        title : {type : String,required: true},
        content : {type : String,required: true},
        tags : {type : [String], default : []},
        isPinned : {type : Boolean, default: false},
        userId : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        createdOn : {type : Date, default: new Date().getTime()},
    }
);

module.exports = mongoose.model("Notes", notesSchema) 