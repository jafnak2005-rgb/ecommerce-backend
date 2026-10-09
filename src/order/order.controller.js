import Order from "./order.model.js";

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

// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Cancelled order cannot be updated
    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Cancelled order cannot be updated",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
