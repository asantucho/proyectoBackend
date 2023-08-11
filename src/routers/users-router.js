import { Router } from 'express';
import UserController from '../controllers/users-controller.js';
import '../lib/jwt/jwt.js';
import passport from 'passport';

const userController = new UserController();
const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get(
  '/profile',
  passport.authenticate('jwtCookies'),
  userController.profile
);
userRouter.get('/:email', userController.getByEmail);

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;
