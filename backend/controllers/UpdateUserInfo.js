const User = require("../models/userModel");

const UpdateUserInfo = async (req, res) => {
  try {
    const { userInfo } = req.body;
    const updateUser = await User.findByIdAndUpdate(userInfo._id, userInfo);

    updateUser
      ? res.status(200).send(updateUser)
      : res.status(400).send({ message: `failed to update user` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = UpdateUserInfo;
