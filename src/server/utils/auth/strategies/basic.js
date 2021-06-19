const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const axios = require('axios');
const boom = require('@hapi/boom');

require('dotenv').config();

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    try {
      const { data, status } = await axios({
        url: `${process.env.API_URL}/api/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: process.env.API_KEY_TOKEN,
        },
      });

      if (!data || status !== 200) {
        cb(boom.unauthorized(), false);
      }

      cb(null, data);
    } catch (error) {
      cb(error);
    }
  }),
);
