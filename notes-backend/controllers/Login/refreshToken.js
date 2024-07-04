const Users = require("../../models").Users;
const jwt = require("jsonwebtoken");

module.exports = {
  // ==================== START REFRESH TOKEN ===================== //
  refreshToken: (req, res) => {
    try {
      // Get refresh token from cookies
      const refreshToken = req.cookies.refreshToken;

      // Check if refresh token not found
      if (!refreshToken) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      console.log("refreshToken", refreshToken);
      console.log("process.env.REFRESH_TOKEN_SECRET", process.env.REFRESH_TOKEN_SECRET);

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

            // Create access token
            const userId = user.id;
            const name = user.name;
            const email = user.email;
            const payload = { userId, name, email };

            const accessToken = jwt.sign(
              payload,
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "2h",
              }
            );

            // Send access token
            res.status(200).json({
              message: accessToken,
            });
          } catch (error) {
            res.status(500).json({
              message: "Internal Server Error",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ==================== END REFRESH TOKEN ===================== //
};
