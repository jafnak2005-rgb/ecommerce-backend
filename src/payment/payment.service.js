import Payment from "./payment.model.js";
import Order from "../order/order.model.js";

export const createPayment = async (userId, data) => {
  const { order, paymentMethod } = data;

  if (!order) {
    throw new Error("Order ID is required");
  }

  if (!paymentMethod) {
    throw new Error("Payment method is required");
  }

  if (!["COD", "CARD", "UPI"].includes(paymentMethod)) {
    throw new Error("Invalid payment method");
  }

  const existingOrder = await Order.findOne({
    _id: order,
    user: userId,
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  const existingPayment = await Payment.findOne({
    order: existingOrder._id,
  });

  if (existingPayment) {
    throw new Error("Payment already exists for this order");
  }

  const amount = existingOrder.totalAmount;

  const payment = await Payment.create({
    order: existingOrder._id,
    user: userId,
    amount,
    paymentMethod,
    paymentStatus: "pending",
  });

  return payment;
};

export const getPayments = async (userId) => {
  return await Payment.find({ user: userId })
    .populate("order")
    .sort({ createdAt: -1 });
};

export const getPaymentById = async (userId, id) => {
  return await Payment.findOne({
    _id: id,
    user: userId,
  }).populate("order");
};