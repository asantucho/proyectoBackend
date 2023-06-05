import {
  createMessageServices,
  getAllMessagesService,
  getMessageByIdService,
  deleteAllMessagesService,
  deleteMessageByIdService,
  updateMessageService,
} from '../services/messages-services.js';

export const createMessageController = async (req, res, next) => {
  try {
    const { user, message } = req.body;
    const newMessage = await createMessageServices({ user, message });
    res.json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getAllMessagesController = async (req, res, next) => {
  try {
    const messages = await getAllMessagesService();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const getMessageByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await getMessageByIdService(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export const deleteAllMessagesController = async (req, res, next) => {
  try {
    const emptyChat = await deleteAllMessagesService();
    res.json(`chat emptied successfully. Messages deleted: ${emptyChat}`);
  } catch (error) {
    next(error);
  }
};

export const deleteMessageByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMessage = await deleteMessageByIdService(id);
    console.log('llegamos a controler');
    res.json(`${deletedMessage} deleted successfully`);
  } catch (error) {
    next(error);
  }
};
