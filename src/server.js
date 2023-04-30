import express from 'express';
import { __dirname } from './path.js';
import productsRouter from './router/products-router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/products', productsRouter);

app.listen(8080, () => {
  console.log('server working at 8080 port');
});
