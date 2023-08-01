import MessageServices from '../services/messages-services.js';
import Controller from './main-controller.js';

const messageServices = new MessageServices();

export default class MessageController extends Controller {
  constructor() {
    super(messageServices);
  }
}
