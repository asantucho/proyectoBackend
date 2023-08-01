import { Router } from 'express';
import MessageController from '../controllers/messages-controllers.js';

const messageController = new MessageController();

const messagesRouter = Router();

messagesRouter.get('/', messageController.getAll);
messagesRouter.get('/:id', messageController.getById);
messagesRouter.post('/', messageController.create);
messagesRouter.delete('/:id', messageController.delete);

export default messagesRouter;
