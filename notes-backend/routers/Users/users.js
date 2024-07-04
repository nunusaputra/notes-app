const express = require("express");
const { register, Login, Logout } = require("../../controllers/Login/Users");
const { refreshToken } = require("../../controllers/Login/refreshToken");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email is not valid"),

    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength(8)
      .withMessage("Password must be at least 8 characters")
      .matches(/[A-Z]/g)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/g)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/g)
      .withMessage("Password must contain at least one number")
      .not()
      .matches(/\s/g)
      .withMessage("Password cannot contain whitespaces"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Email is not valid"),
  ],
  Login
);
router.delete("/logout", Logout);
router.get("/token", refreshToken);

module.exports = router;
