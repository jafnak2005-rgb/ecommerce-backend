import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "./order.service.js";


export const create = async (req, res) => {
  try {
    const order = await createOrder(
      req.user.id,
      req.body
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const orders = await getOrders(req.user.id);

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const order = await getOrderById(
      req.user.id,
      req.params.id
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const cancel = async (req, res) => {
  try {
    const order = await cancelOrder(
      req.user.id,
      req.params.id
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};