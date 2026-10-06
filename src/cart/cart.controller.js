import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "./cart.service.js";


export const get = async (req, res) => {
  try {
    const cart = await getCart(req.user.id);

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const add = async (req, res) => {
  try {
    const cart = await addToCart(
      req.user.id,
      req.body
    );

    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const update = async (req, res) => {
  try {
    const cart = await updateCartItem(
      req.user.id,
      req.params.itemId,
      req.body.quantity
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const cart = await removeFromCart(
      req.user.id,
      req.params.itemId
    );

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const clear = async (req, res) => {
  try {
    const cart = await clearCart(req.user.id);

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};