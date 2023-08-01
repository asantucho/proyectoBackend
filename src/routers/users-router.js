import { Router } from 'express';
import UserController from '../controllers/users-controller.js';
import { checkAuth } from '../jwt/jwt.js';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);
userRouter.post('/register', userController.register);
userRouter.get('/:email', userController.getByEmail);
userRouter.post('/login', userController.login);
userRouter.get('/profile', checkAuth, userController.profile);

export default userRouter;
