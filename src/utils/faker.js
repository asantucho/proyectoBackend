import { faker } from '@faker-js/faker';

export const generateProduct = () => {
  return {
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({ min: 50, max: 1000 }),
    category: faker.commerce.department(),
  };
};
