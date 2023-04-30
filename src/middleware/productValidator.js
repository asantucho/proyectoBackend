export const productValidator = (req, res, next) => {
  const product = req.body;
  if (product.title === '' || product.title === undefined) {
    res.status(404).send('not a valid product');
  } else {
    next();
  }
};
