const Users = require("../../models").Users;
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

module.exports = {
  // =================== START REGISTER =================== //
  register: async (req, res) => {
    try {
      // const {id} = req.params
      const { name, email, password, confPassword, birthdate } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          error: error.array()[0].msg,
        });
      }

      // Get user by id
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      // Check if email is dupliacted
      if (user) {
        return res.status(400).json({
          message: "Email already used!",
        });
      }

      // Check if password and confirm password is same
      if (password !== confPassword) {
        return res.status(400).json({
          message: "Password and confirm password doesn't match!",
        });
      }

      // Hash password
      const hashPassword = await argon.hash(password);

      // Create user
      const newUser = await Users.create({
        name,
        email,
        password: hashPassword,
        birthdate,
      });

      // Return response
      res.status(201).json({
        message: "Success create new user",
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // =================== END REGISTER =================== //

  //   =================== START LOGIN ==================== //
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          error: error.array()[0].msg,
        });
      }

      // Get user by email
      const user = await Users.findOne({
        where: {
          email,
        },
      });

      // Check if user not found
      if (!user) {
        return res.status(404).json({
          message: "Email not registered!",
        });
      }

      // Check password
      const checkPassword = await argon.verify(user.password, password);

      // Check if password not match
      if (!checkPassword) {
        return res.status(400).json({
          message: "Wrong password!",
        });
      }

      // Create access token and refresh token
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      const accessSecret = process.env.ACCESS_TOKEN_SECRET;
      const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

      const accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: "1d",
      });

      // Update refresh token
      await Users.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            id: payload.id,
          },
        }
      );

      // Setting cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Return response
      res.status(200).json({
        token: accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   =================== END LOGIN ==================== //

  //   =================== START LOGOUT ==================== //
  Logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      // Check if refresh token not found
      if (!refreshToken) {
        return res.sendStatus(204);
      }

      // Get user by refresh token
      const user = await Users.findOne({
        where: {
          refresh_token: refreshToken,
        },
      });

      // Check if user not found
      if (!user) {
        return res.sendStatus(204);
      }

      // Update refresh token
      await Users.update(
        {
          refresh_token: null,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      // Clear cookie
      res.clearCookie("refreshToken");

      // Return response
      res.status(200).json({
        message: "Logout success",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   =================== END LOGOUT ==================== //
};
