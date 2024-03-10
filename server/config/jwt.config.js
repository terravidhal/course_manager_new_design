const jwt = require("jsonwebtoken");

const StudentModel = require("../models/student.model");

const InstructorModel = require("../models/instructor.model");

const UserModel = require("../models/user.model");

module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        const user = await UserModel.findOne({ _id: decodedToken._id });
        const student = await StudentModel.findOne({ _id: decodedToken._id });
        const instructor = await InstructorModel.findOne({
          _id: decodedToken._id,
        });
        console.log(" decodedToken._id", decodedToken._id);
        if (err) {
          res
            .status(401)
            .json({
              verified: false,
              message: "please make you are logged in",
            });
        } else {
          if (user) {
            console.log("user", user);
            req.role = user.role;
            console.log("You are authenticated!");
            next();
          } else if (student) {
            console.log("student", student);
            req.role = student.role;
            console.log("You are authenticated!");
            next();
          } else if (instructor) {
            console.log("instructor", instructor);
            req.role = instructor.role;
            req.isInstructor = instructor.isInstructor;
            console.log("You are authenticated!");
            next();
          } else {
            console.log("null");
          }
        }
      }
    );
  },

  checkPermissions: (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.role)) {
        const error = res
          .status(401)
          .json({
            verified: false,
            message: "you do not have permission to perform this action",
          });
        next(error);
      } else {
        next();
      }
    };
  },
};
