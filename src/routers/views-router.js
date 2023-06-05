import { Router } from 'express';

const viewsRouter = Router();

viewsRouter.get('/chat', (req, res) => {
  res.render('chat');
});

viewsRouter.get('/products', (req, res) => {
  res.render('realtimeproducts');
});

viewsRouter.get('/', (req, res) => {
  res.render('home');
});

export default viewsRouter;
