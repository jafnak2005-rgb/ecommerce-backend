
import Cart from "./cart.model.js";
import ProductVariant from "../productvariant/productvariant.model.js";

const getPopulatedCart = async (userId) => {
  return Cart.findOne({ user: userId }).populate({
    path: "items.productVariant",
    populate: {
      path: "product",
    },
  });
};

const validateQuantity = (quantity) => {
  if (
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    throw new Error("Quantity must be a positive integer");
  }
};

const checkStock = async (variantId, quantity) => {
  const variant = await ProductVariant.findById(variantId);

  if (!variant) {
    throw new Error("Product variant not found");
  }

  if (Number(variant.stockQuantity) < quantity) {
    throw new Error(
      `Only ${variant.stockQuantity} items are available in stock`
    );
  }

  return variant;
};

export const getCart = async (userId) => {
  let cart = await getPopulatedCart(userId);

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });

    cart = await getPopulatedCart(userId);
  }

  return cart;
};

export const addToCart = async (userId, data) => {
  const { productVariant, quantity } = data;

  if (!productVariant || quantity === undefined) {
    throw new Error(
      "Product variant and quantity are required"
    );
  }

  validateQuantity(quantity);

  let cart = await Cart.findOne({ user: userId });

  const existingItem = cart?.items.find(
    (item) =>
      item.productVariant.toString() ===
      String(productVariant)
  );

  const finalQuantity =
    (existingItem?.quantity || 0) + quantity;

  await checkStock(productVariant, finalQuantity);

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ productVariant, quantity }],
    });
  } else if (existingItem) {
    existingItem.quantity = finalQuantity;
    await cart.save();
  } else {
    cart.items.push({ productVariant, quantity });
    await cart.save();
  }

  return getPopulatedCart(userId);
};

export const updateCartItem = async (
  userId,
  itemId,
  quantity
) => {
  validateQuantity(quantity);

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  await checkStock(item.productVariant, quantity);

  item.quantity = quantity;

  await cart.save();

  return getPopulatedCart(userId);
};

export const removeFromCart = async (
  userId,
  itemId
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  cart.items.pull(itemId);

  await cart.save();

  return getPopulatedCart(userId);
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return getPopulatedCart(userId);
};
