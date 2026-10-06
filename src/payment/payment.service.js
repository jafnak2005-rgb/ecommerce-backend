import Payment from "./payment.model.js";

export const createPayment = async (data) => {
  const payment = await Payment.create(data);

  return payment;
};

export const getPayments = async () => {
  return await Payment.find()
    .populate("order")
    .populate("user", "-password");
};

export const getPaymentById = async (id) => {
  return await Payment.findById(id)
    .populate("order")
    .populate("user", "-password");
};