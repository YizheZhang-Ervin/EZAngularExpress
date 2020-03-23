var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TodolistSchema = new Schema(
  {
    title: { type: String, required: "missing title" },
    description: { type: String, required: "missing description" },
    // createdDate: { type: Date, required: "missing Date" },
    // modifiedDate: { type: Date, required: "missing Date" }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' }
  }
);

// get virtual attribute
TodolistSchema.virtual("id").get(function() {
  return this._id.toHexString();
});

// use virtuals attribute
TodolistSchema.set("toJSON", {
  virtuals: true
});

module.exports = mongoose.model("Todolist", TodolistSchema);
