"use strict";

const todolistService = require("./../services/todolist-service");

/**
 * Sets response for fetching all existing todo
 *
 * @param request
 * @param response
 */
exports.list = (request, response) => {
  const totalQuery = request.query.total;
  const params = {};
  if (totalQuery) {
    params.total = totalQuery;
  }
  const promise = todolistService.search(params);
  const result = todolist => {
    response.status(200);
    response.json(todolist);
  };
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * Add a todo item and sets the response.
 *
 * @param request
 * @param response
 */
exports.save = (request, response) => {
  const todolist = Object.assign({}, request.body);
  const result = savedTodolist => {
    response.status(201);
    response.json(savedTodolist);
  };
  const promise = todolistService.save(todolist);
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * update a todo item
 *
 * @param request
 * @param response
 */
exports.update = (request, response) => {
  const todolistId = request.params.id;
  const updatedTodolist = Object.assign({}, request.body);
  updatedTodolist.id = todolistId;
  const result = todolist => {
    response.status(200);
    response.json(todolist);
  };
  const promise = todolistService.update(updatedTodolist);
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * delete a todo item
 *
 * @param request
 * @param response
 */
exports.delete = (request, response) => {
  const todolistId = request.params.id;
  const result = () => {
    response.status(200);
    response.json({
      message: "Successfully Deleted."
    });
  };
  const promise = todolistService.delete(todolistId);
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = response => {
  const errorCallback = error => {
    if (error) {
      response.status(500);
      response.json({
        message: error.message
      });
    }
  };
  return errorCallback;
};
