module.exports = {
  mongodb: {
    server: process.env.ME_CONFIG_MONGODB_SERVER || "mongo",
    port: process.env.ME_CONFIG_MONGODB_PORT || 27017,
    admin: true,
    auth: {
      username: process.env.ME_CONFIG_MONGODB_ADMINUSERNAME || "admin",
      password: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD || "admin",
    },
  },
  site: {
    baseUrl: "/",
    cookieKeyName: "mongo-express",
    sessionSecret: "secret",
    port: 8081,
  },
  useBasicAuth: true,
  basicAuth: {
    username: process.env.ME_CONFIG_BASICAUTH_USERNAME || "admin",
    password: process.env.ME_CONFIG_BASICAUTH_PASSWORD || "admin",
  },
};
