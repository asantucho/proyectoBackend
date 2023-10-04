import { Router } from 'express';
import productRouter from './product-router.js';
import userRouter from './users-router.js';
import currentRouter from './sessions-router.js';
import cartRouter from './carts-router.js';
import messagesRouter from './messages-router.js';
import viewsRouter from './views-router.js';
import mockProductRouter from './mockProducts-router.js';

const mainRouter = Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/sessions', currentRouter);
mainRouter.use('/carts', cartRouter);
mainRouter.use('/messages', messagesRouter);
mainRouter.use('/views', viewsRouter);
mainRouter.use('/mockingproducts', mockProductRouter);

export default mainRouter;
