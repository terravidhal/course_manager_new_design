
const UserModel = require("../models/user.model");

module.exports = {
  register: (req, res) => {
    if (req.body.keyCode !== process.env.KEY_CODE) {
      return res.status(400).json({ message: "Invalid keycode" });
    }

    const { keycode, ...userData } = req.body;

    req.body = userData;

    const newUser = new UserModel(req.body);

    newUser
      .save()
      .then((newUser) => {
        res
          .status(201)
          .json({ message: "User successfully created", user: newUser });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(400).json({ message: "Something went wrong", errors: err });
      });
  },
};
