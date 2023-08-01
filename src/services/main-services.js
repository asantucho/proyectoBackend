export default class Services {
  constructor(manager) {
    this.manager = manager;
  }
  async create(object) {
    try {
      const response = await this.manager.create(object);
      return response;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getAll() {
    try {
      const docs = await this.manager.getAll();
      return docs;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async getById(id) {
    try {
      const response = await this.manager.getById(id);
      return response;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async update(id, object) {
    try {
      const updatedResponse = await this.manager.update(id, object);
      return updatedResponse;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
  async delete(id) {
    try {
      const toDelete = await this.manager.delete(id);
      return toDelete;
    } catch (error) {
      console.log('error en el service', error);
    }
  }
}
