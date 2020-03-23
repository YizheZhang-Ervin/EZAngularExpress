"use strict";
const todolistController = require("../controllers/todolist-controller");
module.exports = app => {
  app
    .route("/todolist")
    .get(todolistController.list)
    .post(todolistController.save);
  app
    .route("/todolist/:id")
    .put(todolistController.update)
    .delete(todolistController.delete);
};
