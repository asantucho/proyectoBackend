import token from './test-processPurchase.js';
import axios from 'axios';

const tokenUser = token;
const url = 'http://localhost:8080/carts/64d6adeedb12d52a57ff1501/purchase';

axios
  .post(url, null, {
    headers: {
      Authorization: `Bearer ${tokenUser}`,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
