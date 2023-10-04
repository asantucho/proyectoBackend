import Controller from './main-controller.js';
import UserService from '../services/users-services.js';
import { createResponse } from '../utils/createResponse.js';
import { sendPasswordResetEmail } from '../utils/mailing-service.js';

const userService = new UserService();

export default class UserController extends Controller {
  constructor() {
    super(userService);
  }
  register = async (req, res, next) => {
    try {
      const token = await this.service.register(req.body);
      createResponse(res, 200, token);
    } catch (error) {
      next(error.message);
    }
  };
  login = async (req, res, next) => {
    try {
      const userExists = await this.service.login(req.body);
      userExists
        ? createResponse(res, 200, userExists)
        : createResponse(res, 404, {
            method: 'login',
            error: 'Validation error',
          });
    } catch (error) {
      next(error.message);
    }
  };
  profile = async (req, res, next) => {
    try {
      const { firstName, lastName, email, role } = req.user;
      createResponse(res, 200, {
        firstName,
        lastName,
        email,
        role,
      });
    } catch (error) {
      next(error.message);
    }
  };
  getByEmail = async (req, res, next) => {
    try {
      const existingUser = await this.service.getByEmail(req.user);
      createResponse(res, 200, existingUser);
    } catch (error) {
      next(error);
    }
  };
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.service.getByEmail(email);

      if (!user) {
        return createResponse(res, 404, { error: 'User not found' });
      }

      const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: '1h',
      });

      await sendPasswordResetEmail(user.email, resetToken);

      createResponse(res, 200, {
        message: 'Reset link sent successfully!',
      });
    } catch (error) {
      next(error.message);
    }
  };
  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      try {
        const decodedToken = jwt.verify(token, SECRET_KEY);

        const updatedUser = await this.service.updatePassword(
          decodedToken.userId,
          newPassword
        );
        createResponse(res, 200, {
          message: 'Password reset successfully!',
        });
      } catch (err) {
        createResponse(res, 400, {
          error: 'Token provided invalid or expired',
        });
      }
    } catch (error) {
      next(error.message);
    }
  }
  generateResetLink = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.service.getByEmail(email);

      if (!user) {
        return createResponse(res, 404, { error: 'user not found' });
      }

      if (user.resetToken) {
        const decodedToken = jwt.verify(user.resetToken, SECRET_KEY);
        if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
          return createResponse(res, 400, {
            error: 'active token',
          });
        }
      }

      const resetToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: '1h',
      });

      user.resetToken = resetToken;
      await user.save();

      await sendPasswordResetEmail(user.email, resetToken);
      createResponse(res, 200, {
        message: 'reset link sent by email successfully',
      });
    } catch (error) {
      next(error.message);
    }
  };
}
