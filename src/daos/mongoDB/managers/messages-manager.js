import { messageModel } from './models/message-model.js';

export default class MessagesDaoMongo {
  async createMessage({ user, message }) {
    try {
      const newMessage = await messageModel.create({ user, message });
      return newMessage;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMessages() {
    try {
      const messages = await messageModel.find({});
      return messages;
    } catch (error) {
      console.log(error);
    }
  }
  async getMessageById(id) {
    try {
      const message = await messageModel.findById(id);
      if (!message) throw new Error('message not found');
      return message;
    } catch (error) {
      console.log(error);
    }
  }
  async updateMessage(object, id) {
    try {
      const updatedMessage = await messageModel.updateOne(object, { _id: id });
      return updatedMessage;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteMessageById(id) {
    try {
      const deletedMessage = await messageModel.findByIdAndDelete(id);
      console.log('al dao llegamos');
      return deletedMessage;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllMessages() {
    try {
      const emptyChat = await messageModel.deleteMany({});
      return emptyChat;
    } catch (error) {
      console.log(error);
    }
  }
}
