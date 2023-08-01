import { createResponse } from '../utils.js';

export default class Controller {
  constructor(service) {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const newResponse = await this.service.create(req.body);
      if (!newResponse) {
        createResponse(res, 404, {
          method: 'create',
          error: 'Validation error',
        });
      } else {
        createResponse(res, 200, newResponse);
      }
    } catch (error) {
      next(error.message);
    }
  };
  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      createResponse(res, 200, response);
    } catch (error) {
      next(error.message);
    }
  };
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const responseById = await this.service.getById(id);
      if (!responseById) {
        createResponse(res, 404, {
          method: 'getById',
          error: 'Validation error',
        });
      } else {
        createResponse(res, 200, responseById);
      }
    } catch (error) {
      next(error.message);
    }
  };
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const responseById = await this.service.getById(id);
      if (!responseById) {
        if (!item)
          createResponse(res, 404, {
            method: 'update',
            error: 'Item not found!',
          });
      }
      const updatedResponse = await this.service.update(id, req.body);
      createResponse(res, 200, updatedResponse);
    } catch (error) {
      next(error.message);
    }
  };
  delete = async (req, res, next) => {
    const { id } = req.params;
    const toDelete = await this.service.delete(id);
    createResponse(res, 200, toDelete);
  };
}
