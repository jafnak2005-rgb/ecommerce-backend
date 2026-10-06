import Address from "./address.model.js";

export const createAddress = async (userId, data) => {
  const address = await Address.create({
    ...data,
    user: userId,
  });

  return address;
};

export const getAddresses = async (userId) => {
  return await Address.find({ user: userId })
    .sort({ isDefault: -1, createdAt: -1 });
};

export const getAddressById = async (userId, id) => {
  const address = await Address.findOne({
    _id: id,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  return address;
};

export const updateAddress = async (
  userId,
  id,
  data
) => {
  const address = await Address.findOneAndUpdate(
    {
      _id: id,
      user: userId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!address) {
    throw new Error("Address not found");
  }

  return address;
};

export const deleteAddress = async (userId, id) => {
  const address = await Address.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!address) {
    throw new Error("Address not found");
  }

  return {
    message: "Address deleted successfully",
  };
};