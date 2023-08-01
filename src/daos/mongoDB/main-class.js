export default class MainClass {
  constructor(model) {
    this.model = model;
    console.log('MainClass constructor called');
  }
  async create(object) {
    try {
      const response = await this.model.create(object);
      console.log(response);
      return response;
    } catch (error) {
      console.log('error en el MAIN-DAO', error);
    }
  }
  async getAll() {
    try {
      const response = await this.model.find({});
      return response;
    } catch (error) {
      console.log('error en el MAIN-DAO', error);
    }
  }
  async getById(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.log('error en MAIN-DAO', error);
    }
  }
  async update(id, object) {
    try {
      const updatedResponse = await this.model.updateOne({ _id: id }, object);
      return updatedResponse;
    } catch (error) {
      console.log('error en MAIN-DAO', error);
    }
  }
  async delete(id) {
    try {
      const toDelete = await this.model.findByIdAndDelete(id);
      return toDelete;
    } catch (error) {
      console.log('error en MAIN-DAO', error);
    }
  }
}
