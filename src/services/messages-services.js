import MessagesDaoMongo from '../daos/mongoDB/messages-dao-mdb.js';

const messages = new MessagesDaoMongo();

export const createMessageServices = async ({ user, message }) => {
  try {
    const newMessage = await messages.createMessage({ user, message });
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessagesService = async () => {
  try {
    const allMessages = await messages.getAllMessages();
    return allMessages;
  } catch (error) {
    console.log(error);
  }
};

export const getMessageByIdService = async (id) => {
  try {
    const message = await messages.getMessageById(id);
    return message;
  } catch (error) {
    console.log(error);
  }
};

export const updateMessageService = async (object, id) => {
  try {
    const updatedMessage = await messages.updateMessage(object, id);
    return updatedMessage;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessageByIdService = async (id) => {
  try {
    const deletedMessage = await messages.deleteMessageById(id);
    console.log('estamos en el services');
    return deletedMessage;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllMessagesService = async () => {
  try {
    const emptyChat = await messages.deleteAllMessages();
    console.log(`Chat emptied successfully. Messages deleted: ${emptyChat}`);
  } catch (error) {}
};
