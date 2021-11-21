import axios from 'axios';

export default axios.create({
  baseURL: 'https://619a00fd9022ea0017a7afd3.mockapi.io/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});
