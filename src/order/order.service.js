import Order from "./order.model.js";

export const createOrder = async (userId, data) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
  } = data;

  if (!items || items.length === 0) {
    throw new Error("Order items are required");
  }

  if (!shippingAddress) {
    throw new Error("Shipping address is required");
  }

  if (!paymentMethod) {
    throw new Error("Payment method is required");
  }

  let subtotal = 0;

  const orderItems = items.map((item) => {
    const itemSubtotal = item.price * item.quantity;

    subtotal += itemSubtotal;

    return {
      productVariant: item.productVariant,
      quantity: item.quantity,
      price: item.price,
      subtotal: itemSubtotal,
    };
  });

  const shippingCharge = subtotal >= 1000 ? 0 : 50;

  const totalAmount = subtotal + shippingCharge;

  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    subtotal,
    shippingCharge,
    totalAmount,
    paymentMethod,
  });

  return order;
};


export const getOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.productVariant")
    .sort({ createdAt: -1 });
};


export const getOrderById = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  }).populate("items.productVariant");

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};


export const cancelOrder = async (userId, orderId) => {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

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

  order.status = "Cancelled";

  await order.save();

  return order;
};