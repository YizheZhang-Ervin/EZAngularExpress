"use strict";
const todolistController = require("../controllers/todolist-controller");
module.exports = app => {
  app
    .route("/api/test")
    .get(todolistController.list)
    .post(todolistController.save);
  app
    .route("/api/test/:id")
    .put(todolistController.update)
    .delete(todolistController.delete);
};
