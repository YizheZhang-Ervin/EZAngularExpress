"use strict";
const mongoose = require("mongoose"),
  Todolist = mongoose.model("Todolist");

/**
 * fetch all existing todo items
 *
 * @param params
 */
exports.search = params => {
  const promise = Todolist.find(params).exec();
  return promise;
};

/**
 * add a todo item
 *
 * @param todoitem
 */
exports.save = todoitem => {
  const todolist = new Todolist(todoitem);
  return todolist.save();
};

/**
 * update a todo item
 *
 * @param updatedTodoitem
 */
exports.update = updatedTodoitem => {
  const promise = Todolist.findByIdAndUpdate(
    updatedTodoitem.id,
    updatedTodoitem
  ).exec();
  return promise;
};

/**
 * delete a todo item
 *
 * @param todoitemId
 */
exports.delete = todoitemId => {
  const promise = Todolist.findByIdAndRemove(todoitemId).exec();
  return promise;
};
