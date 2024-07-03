const Users = require("../models").Users;
const jwt = require("jsonwebtoken");

module.exports = {
  VerifyToken: async (req, res, next) => {
    // Get token from header
    const authHeader = req.headers["authorization"];

    // Splice bearer from token
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is null
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      try {
        // Send email from token to req
        req.email = decoded.email;

        // Get user by email
        const user = Users.findOne({
          where: {
            email: req.email,
          },
        });

        // Check if user not found
        if (!user) {
          return res.status(404).json({
            message: "User not found!",
          });
        }

        // Send id from token to req
        req.id = decoded.id;
        next();
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });
  },
  //   ==================== END VERIFY TOKEN ===================== //

  //   ==================== START REFRESH TOKEN ===================== //
  RefreshToken: async (req, res) => {
    try {
      // Get refresh token from cookies
      const refreshToken = req.cookies.refreshToken;

      // Check if refresh token not found
      if (!refreshToken) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      // Verify refresh token
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.status(403).json({
              message: "Forbidden",
            });
          }

          try {
            // Get user by id
            const user = await Users.findOne({
              where: {
                id: decoded.id,
              },
            });

            // Check if user not found
            if (!user) {
              return res.status(404).json({
                message: "User not found!",
              });
            }

            // Create access token and refresh token
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name,
            };

            const accessToken = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "5m",
              }
            );

            // Return response
            res.status(200).json({
              token: accessToken,
            });
          } catch (error) {
            res.status(500).json({
              message: error.message,
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
  //   ==================== END REFRESH TOKEN ===================== //
};
