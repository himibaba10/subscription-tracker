import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      date: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // get user details except password
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not available.");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      date: user,
    });
  } catch (error) {
    next(error);
  }
};
