// app/config/index.js

const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/contactbook",
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "contact-book-secret-key",
    jwtExpiration: 86400, // 24h
  },
};
module.exports = config;