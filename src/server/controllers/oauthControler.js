const axios = require('axios');
require('dotenv').config();

const authController = {};

// axios
//   .get('https://github.com/login/oauth/authorize', {
//     client_id: process.env.CLIENT_ID,
//     redirect_uri: 'http://localhost:8080/',
//     allow_signup:true
//   })
//   .then((res) => {
//     console.log(`statusCode: ${res.statusCode}`);
//       console.log(res)
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// console.log(process.env.CLIENT_ID);

module.exports = authController;
