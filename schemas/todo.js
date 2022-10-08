const mongoose = require("mongoose");


const TodoSchema = new mongoose.Schema({
  value: String,
  doneAt: Date,
  order: Number,
  done:Boolean
});
TodoSchema.virtual("todoId").get(function () {
  return this._id.toHexString();
});
TodoSchema.set("toJSON", {
  virtuals: true,
});
module.exports = mongoose.model("Todo", TodoSchema);
