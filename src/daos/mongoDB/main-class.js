import { developmentLogger, productionLogger } from '../../utils/loggers.js';
import config from '../../config/config.js';

export default class MainClass {
  constructor(model) {
    this.model = model;
  }
  async create(object) {
    try {
      const response = await this.model.create(object);
      return response;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error in MAIN-DAO: ${error.message}`);
      } else {
        developmentLogger.error(`Error in MAIN-DAO: ${error.message}`);
      }
    }
  }
  async getAll() {
    try {
      const response = await this.model.find({});
      return response;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error in MAIN-DAO: ${error.message}`);
      } else {
        developmentLogger.error(`Error in MAIN-DAO: ${error.message}`);
      }
    }
  }
  async getById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error in MAIN-DAO: ${error.message}`);
      } else {
        developmentLogger.error(`Error in MAIN-DAO: ${error.message}`);
      }
    }
  }
  async update(id, object) {
    try {
      const updatedResponse = await this.model.updateOne({ _id: id }, object);
      return updatedResponse;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error in MAIN-DAO: ${error.message}`);
      } else {
        developmentLogger.error(`Error in MAIN-DAO: ${error.message}`);
      }
    }
  }
  async delete(id) {
    try {
      const toDelete = await this.model.findByIdAndDelete(id);
      return toDelete;
    } catch (error) {
      if (config.ENV === 'PROD') {
        productionLogger.error(`Error in MAIN-DAO: ${error.message}`);
      } else {
        developmentLogger.error(`Error in MAIN-DAO: ${error.message}`);
      }
    }
  }
}
