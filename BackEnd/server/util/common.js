const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const base64 = require('base-64')

const errorHandler = require('./errorHandler');

const jwtSecret = process.env.JWT_SECRET;
module.exports = {
  bcrypt: bcrypt,
  jwt: jwt,
  jwtSecret: jwtSecret,

  userAuthorization: async (req, res, next) => {
    if (!req.header('Authorization')) {
      return errorHandler.clientError(res, 'noToken', 401);
    }
    try {
      // Verify user token
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, jwtSecret);

      const userData = {
        id: decoded.id,
        name: decoded.name,
      };

      next();
    } catch (error) {
      errorHandler.clientError(res, 'invalidToken', 403);
    }
  },
  extractUserIDFromToken: (req) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    const userID = decoded.id;

    return userID;
  },
  validateEmail: (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  },
  validateProvider: (provider) => {
    return provider === 'native' || provider === 'google';
  },
  /*hasJsonStructure: (str) => {
    if (typeof str !== 'string') {
      return false;
    }

    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === '[object Object]' || type === '[object Array]';
    } catch (err) {
      return false;
    }
  },*/
  checkCustomerLogin: async (req, res, next) => {
    try {
      if (!req.header('Authorization')) {
        process.env.HAS_ACCOUNT = false;
        return next();
      }
      // Verify user token
      const token = req.header('Authorization').replace('Bearer ', '');

      const decoded = jwt.verify(token, jwtSecret);
      const userData = {
        id: decoded.id,
        name: decoded.name,
      };
      next();
    } catch (error) {
      errorHandler.clientError(res, 'invalidToken', 403);
    }
  },
};
