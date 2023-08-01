import MessagesManager from '../daos/mongoDB/managers/messages-manager.js';
import Services from './main-services.js';

const messageManager = new MessagesManager();

export default class MessageServices extends Services {
  constructor() {
    super(messageManager);
  }
}
