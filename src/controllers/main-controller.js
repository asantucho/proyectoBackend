import { createResponse } from '../utils/createResponse.js';
import config from '../config/config.js';

export default class Controller {
  constructor(service) {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const newResponse = await this.service.create(req.body);
      if (config.ENV === 'PROD') {
        productionLogger.info('Create Method sucessfully executed (manager)');
      } else {
        developmentLogger.info('Create Method sucessfully executed (manager)');
      }
      if (!newResponse) {
        createResponse(res, 404, {
          method: 'create',
          error: 'Validation error',
        });
      } else {
        createResponse(res, 200, newResponse);
      }
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(
          `Error with the create method (manager): ${error.message}`
        );
      } else {
        developmentLogger.error(
          `Error with the create method (manager): ${error.message}`
        );
      }
      next(error.message);
    }
  };
  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      if (config.ENV === 'PROD') {
        productionLogger.info('getAll Method sucessfully executed (manager)');
      } else {
        developmentLogger.info('getAll Method sucessfully executed (manager)');
      }
      createResponse(res, 200, response);
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(
          `Error with the getAll method (manager): ${error.message}`
        );
      } else {
        developmentLogger.error(
          `Error with the getAll method (manager): ${error.message}`
        );
      }
      next(error.message);
    }
  };
  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (config.ENV === 'PROD') {
        productionLogger.info('getById Method sucessfully executed (manager)');
      } else {
        developmentLogger.info('getById Method sucessfully executed (manager)');
      }
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
      if (config.ENV === 'PROD') {
        productionLogger.error(
          `Error with the getById method (manager): ${error.message}`
        );
      } else {
        developmentLogger.error(
          `Error with the getById method (manager): ${error.message}`
        );
      }
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
