import { Router } from 'express';
import {
  createMessageController,
  deleteAllMessagesController,
  deleteMessageByIdController,
  getAllMessagesController,
  getMessageByIdController,
} from '../controllers/messages-controllers.js';

const messagesRouter = Router();

messagesRouter.get('/', getAllMessagesController);
messagesRouter.get('/:id', getMessageByIdController);
messagesRouter.post('/', createMessageController);
messagesRouter.delete('/', deleteAllMessagesController);
messagesRouter.delete('/:id', deleteMessageByIdController);

export default messagesRouter;
