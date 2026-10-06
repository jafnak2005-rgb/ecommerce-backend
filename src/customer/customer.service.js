import User from "../user/user.model.js";

export const getCustomers = async () => {
  return await User.find({ role: "customer" })
    .select("-password")
    .sort({ createdAt: -1 });
};


export const getCustomerById = async (id) => {
  const customer = await User.findOne({
    _id: id,
    role: "customer",
  }).select("-password");

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};


export const deleteCustomer = async (id) => {
  const customer = await User.findOneAndDelete({
    _id: id,
    role: "customer",
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return {
    message: "Customer deleted successfully",
  };
};