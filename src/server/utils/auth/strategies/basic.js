const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const { config } = require('../../../config');
const axios = require('axios');
const boom = require('@hapi/boom');

passport.use(
  new BasicStrategy(async function (email, password, cb) {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email,
        },
        data: {
          apiKeyToken: config.apiKeyToken,
        },
      });

      if (!data || status !== 200) {
        cb(boom.unauthorized(), false);
      }

      cb(null, data);
    } catch (error) {
      cb(error);
    }
  })
);
