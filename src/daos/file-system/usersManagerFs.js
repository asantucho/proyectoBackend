import fs from 'fs';
import { __dirname } from '../../utils/utils.js';

const pathFile = __dirname + '/users.json';

export default class UsersManagerFS {
  create = async (user) => {
    try {
      const latestId = await newId();
      const newUser = {
        ...user,
        id: latestId + 1,
      };
      const usersFile = await getUsers();
      usersFile.push(newUser);
      await fs.promises.writeFile(pathFile, JSON.stringify(usersFile));
    } catch (error) {
      console.log(error);
    }
  };
  newId = async () => {
    const users = await getUsers();
    let initialId = 0;
    users.map((user) => {
      if (user.id > initialId) initialId = user.id;
    });
    return initialId;
  };
  getUsers = async (limit = null) => {
    try {
      if (fs.existsSync(pathFile)) {
        const users = await fs.promises.readFile(pathFile, 'utf-8');
        const usersJs = JSON.parse(users);
        if (limit) {
          return usersJs.slice(0, limit);
        } else {
          return usersJs;
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  getUsersById = async (id) => {
    try {
      if (fs.existsSync(pathFile)) {
        const users = await fs.promises.readFile(pathFile, 'utf-8');
        const usersJs = JSON.parse(users);
        return usersJs.find((user) => user.id === id);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  updateUserById = async (id, updatedUser) => {
    try {
      const user = await this.getUsersById(id);
      if (user) {
        user.firstName = updatedUser.firstName ?? user.firstName;
        user.lastName = updatedUser.lastName ?? user.lastName;
        user.email = updatedUser.email ?? user.email;
        user.password = updatedUser.password ?? user.password;

        const users = await fs.promises.readFile(pathFile, 'utf-8');
        const usersJs = JSON.parse(users);
        const updatedUsers = usersJs.map((user) => {
          if (user.id === id) {
            return user;
          }
          return user;
        });
        await fs.promises.writeFile(pathFile, JSON.stringify(updatedUsers));
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteUserById = async (id) => {
    try {
      const users = await fs.promises.readFile(pathFile, 'utf-8');
      const usersJs = JSON.parse(users);
      const deletedUser = usersJs.find((user) => user.id === id);
      const remainingUsers = usersJs.filter((user) => user.id !== id);
      await fs.promises.writeFile(pathFile, JSON.stringify(remainingUsers));
      return deletedUser;
    } catch (error) {
      console.log(error);
    }
  };
}

export const deleteProductById = async (id) => {};
