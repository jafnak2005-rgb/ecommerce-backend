
import mongoose from "mongoose";
import Order from "./order.model.js";
import ProductVariant from "../productvariant/productvariant.model.js";
import Cart from "../cart/cart.model.js";

// CREATE ORDER
export const createOrder = async (userId, data) => {
  const { shippingAddress, paymentMethod } = data;

  if (!shippingAddress) {
    throw new Error("Shipping address is required");
  }

  if (!paymentMethod || !["COD", "ONLINE"].includes(paymentMethod)) {
    throw new Error("Invalid payment method");
  }

  const session = await mongoose.startSession();

  try {
    let createdOrder;

    await session.withTransaction(async () => {
      const cart = await Cart.findOne({ user: userId }).session(session);

      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      let subtotal = 0;
      const orderItems = [];

      // Validate stock and calculate prices
      for (const item of cart.items) {
        const variant = await ProductVariant.findById(
          item.productVariant
        ).session(session);

        if (!variant) {
          throw new Error("Product variant not found");
        }

        if (
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          throw new Error("Invalid cart quantity");
        }

        if (item.quantity > variant.stock) {
          throw new Error(`Insufficient stock for ${variant.sku}`);
        }

        const price = variant.price;
        const itemSubtotal = price * item.quantity;

        subtotal += itemSubtotal;

        orderItems.push({
          productVariant: variant._id,
          quantity: item.quantity,
          price,
          subtotal: itemSubtotal,
        });
      }

      // Reduce stock safely
      for (const item of orderItems) {
        const result = await ProductVariant.updateOne(
          {
            _id: item.productVariant,
            stock: { $gte: item.quantity },
          },
          {
            $inc: { stock: -item.quantity },
          },
          { session }
        );

        if (result.modifiedCount !== 1) {
          throw new Error("Stock changed. Please try again.");
        }
      }

      const shippingCharge = subtotal >= 1000 ? 0 : 50;
      const totalAmount = subtotal + shippingCharge;

      const orders = await Order.create(
        [
          {
            user: userId,
            items: orderItems,
            shippingAddress,
            subtotal,
            shippingCharge,
            totalAmount,
            paymentMethod,
          },
        ],
        { session }
      );

      createdOrder = orders[0];

      // Clear cart
      cart.items = [];
      await cart.save({ session });
    });

    return createdOrder;
  } finally {
    await session.endSession();
  }
};


// GET ALL ORDERS
export const getOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.productVariant")
    .sort({ createdAt: -1 });
};


// GET SINGLE ORDER
export const getOrderById = async (userId, orderId) => {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new Error("Invalid order ID");
  }

  return await Order.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.productVariant");
};


// CANCEL ORDER
export const cancelOrder = async (userId, orderId) => {
  if (!mongoose.isValidObjectId(orderId)) {
    throw new Error("Invalid order ID");
  }

  const session = await mongoose.startSession();

  try {
    let cancelledOrder;

    await session.withTransaction(async () => {
      const order = await Order.findOne({
        _id: orderId,
        user: userId,
      }).session(session);

      if (!order) {
        throw new Error("Order not found");
      }

      if (
        ["Packed", "Shipped", "Delivered", "Cancelled"].includes(
          order.status
        )
      ) {
        throw new Error("Order cannot be cancelled");
      }

      // Restore stock
      for (const item of order.items) {
        const result = await ProductVariant.updateOne(
          { _id: item.productVariant },
          { $inc: { stock: item.quantity } },
          { session }
        );

        if (result.matchedCount !== 1) {
          throw new Error("Product variant not found during cancellation");
        }
      }

      order.status = "Cancelled";
      await order.save({ session });

      cancelledOrder = order;
    });

    return cancelledOrder;
  } finally {
    await session.endSession();
  }
};
