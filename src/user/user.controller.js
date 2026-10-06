import {
  registerUser,
  loginUser,
  getUserProfile,
} from "./user.service.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(
      error.message === "Email already exists" ? 409 : 400
    ).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};