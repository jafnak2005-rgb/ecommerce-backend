import Order from "./order.model.js";
import ProductVariant from "../productvariant/productvariant.model.js";
import Cart from "../cart/cart.model.js";

// CREATE ORDER
export const createOrder = async (userId, data) => {
  const { shippingAddress, paymentMethod } = data;

  if (!shippingAddress) {
    throw new Error("Shipping address is required");
  }

  if (!paymentMethod) {
    throw new Error("Payment method is required");
  }

  if (!["COD", "ONLINE"].includes(paymentMethod)) {
    throw new Error("Invalid payment method");
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let subtotal = 0;
  const orderItems = [];

  // Validate stock and calculate price from database
  for (const item of cart.items) {
    const variant = await ProductVariant.findById(item.productVariant);

    if (!variant) {
      throw new Error("Product variant not found");
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

  const shippingCharge = subtotal >= 1000 ? 0 : 50;
  const totalAmount = subtotal + shippingCharge;

  // Reduce stock
  for (const item of cart.items) {
    const variant = await ProductVariant.findById(item.productVariant);

    variant.stock -= item.quantity;

    await variant.save();
  }

  // Create order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingCharge,
    totalAmount,
    paymentMethod,
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  return order;
};


// GET ALL ORDERS
export const getOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.productVariant")
    .sort({ createdAt: -1 });
};


// GET SINGLE ORDER
export const getOrderById = async (userId, orderId) => {
  return await Order.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.productVariant");
};


// CANCEL ORDER + RESTORE STOCK
export const cancelOrder = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (
    ["Packed", "Shipped", "Delivered", "Cancelled"].includes(order.status)
  ) {
    throw new Error("Order cannot be cancelled");
  }

  // Restore stock
  for (const item of order.items) {
    const variant = await ProductVariant.findById(
      item.productVariant
    );

    if (variant) {
      variant.stock += item.quantity;

      await variant.save();
    }
  }

  order.status = "Cancelled";

  await order.save();

  return order;
};