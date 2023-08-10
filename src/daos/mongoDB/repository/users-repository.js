import userManager from '../../persistence.js';
import UsersResponseDTO from '../dtos/users-dto.js';

export default class UsersRepository {
  constructor() {
    this.userManager = userManager;
  }

  async getCurrent(id) {
    try {
      const user = await this.userManager.getById(id);
      console.log('user--->', user);
      const userDTO = new UsersResponseDTO(user);
      return userDTO;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
