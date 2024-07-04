const Users = require("../../models").Users;
const argon = require("argon2");

module.exports = {
  // ==================== START EDIT PROFILE ===================== //
  editProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, address, phone_number, birthdate, desc } = req.body;

      // Get user by id
      const user = await Users.findOne({
        where: {
          id,
        },
      });

      // Check if user not found
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // Update user
      await Users.update(
        {
          name,
          email,
          address,
          phone_number,
          birthdate,
          desc,
        },
        {
          where: {
            id,
          },
        }
      );

      // Return response
      res.status(200).json({
        message: "Success update profile",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ==================== END EDIT PROFILE ===================== //

  // ==================== START GET PROFILE ===================== //
  Me: async (req, res) => {
    try {
      // Get user by id
      const user = await Users.findOne({
        where: {
          id: req.id,
        },
        attributes: [
          "id",
          "name",
          "email",
          "address",
          "phone_number",
          "birthdate",
          "desc",
        ],
      });

      // Check if user not found
      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // Return response
      res.status(200).json({
        message: "Success get profile",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // ==================== END GET PROFILE ===================== //

  // ==================== START CHANGE PASSWORD ===================== //
  changePass: async (req, res) => {
    const { currentPassword, newPassword, confPassword } = req.body;
    const {id} = req.params
    // Get user by id
    const user = await Users.findOne({
      where: {
        id
      },
    });

    // Check if user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Check if currentPassword, newPassword, and confPassword is null
    if (currentPassword === "" || newPassword === "" || confPassword === "") {
      return res.status(400).json({
        message: "All fields must be filled!",
      });
    }

    // Check if password and confirm password is same
    if (newPassword !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password doesn't match!",
      });
    }

    const oldPassword = user.password
    // Check if current password is not correct
    const match = await argon.verify(oldPassword, currentPassword);

    if (!match) {
      return res.status(400).json({
        message: "Current password is not correct!",
      });
    }

    // Hash password
    const hashPassword = await argon.hash(newPassword);

    // Update password user
    try {
      await Users.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id
          },
        }
      );

      // Return response
      res.status(200).json({
        message: "Success change password!",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  // ==================== END CHANGE PASSWORD ===================== //
};
