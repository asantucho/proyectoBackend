export const productValidator = (req, res, next) => {
  const product = req.body;
  if (
    typeof product.title === 'string' &&
    typeof product.description === 'string' &&
    typeof product.code === 'string' &&
    typeof product.price === 'number' &&
    typeof product.status === 'boolean' &&
    typeof product.stock === 'number' &&
    typeof product.category === 'string'
  ) {
    next();
  } else {
    res
      .status(404)
      .send('one or more product fields were completed with inaccurate data');
  }
};
