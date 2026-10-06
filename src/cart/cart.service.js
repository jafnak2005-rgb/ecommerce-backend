import Cart from "./cart.model.js";

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId })
    .populate("items.productVariant");

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [],
    });
  }

  return cart;
};


export const addToCart = async (userId, data) => {
  const { productVariant, quantity } = data;

  if (!productVariant || !quantity) {
    throw new Error("Product variant and quantity are required");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          productVariant,
          quantity,
        },
      ],
    });

    return cart;
  }

  const existingItem = cart.items.find(
    (item) =>
      item.productVariant.toString() === productVariant
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productVariant,
      quantity,
    });
  }

  await cart.save();

  return cart;
};


export const updateCartItem = async (
  userId,
  itemId,
  quantity
) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  item.quantity = quantity;

  await cart.save();

  return cart;
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

  return cart;
};


export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  return cart;
};