const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require('../util/autopopulate')

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", require: true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
})
 
// Does this function before returning from a find or populate on comment
commentSchema.pre('find', function () {
    this.populate("comments").populate("author");
});


module.exports = mongoose.model("Comment", commentSchema)