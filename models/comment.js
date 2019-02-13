const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", require: true }
})

// Does this function before returning from a find or populate on comment
commentSchema.pre("find", function(){
    this.populate("author")
})


module.exports = mongoose.model("Comment", commentSchema)