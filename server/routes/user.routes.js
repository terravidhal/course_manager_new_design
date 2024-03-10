const { register } = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/api/registerAdmin", register);
  // app.post("/api/loginAdmin", login);
};
