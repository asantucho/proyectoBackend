export const generateUniqueCode = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomPart}`;
};

export const calculateTotalAmount = (products) => {
  console.log('products del calculateTotal: ', products);
  return products.reduce(
    (total, product) => total + product.quantity * product.product.price,
    0
  );
};
