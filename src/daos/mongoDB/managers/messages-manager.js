import { messageModel } from '../models/message-model.js';
import MainClass from '../main-class.js';

export default class MessagesManager extends MainClass {
  constructor() {
    super(messageModel);
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
