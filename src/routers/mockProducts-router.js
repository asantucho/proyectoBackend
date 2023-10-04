import { Router } from 'express';
import MockProductController from '../controllers/mockProduct-controller.js';

const mockProductController = new MockProductController();
const mockProductRouter = Router();

mockProductRouter.post('/', mockProductController.createMockProducts);
mockProductRouter.get('/', mockProductController.getAllMockProducts);

export default mockProductRouter;
