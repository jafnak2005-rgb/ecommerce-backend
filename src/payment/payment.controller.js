import {
  createPayment,
  getPayments,
  getPaymentById,
} from "./payment.service.js";

export const create = async (req, res) => {
  try {
    const payment = await createPayment(
      req.user.id,
      req.body
    );

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const payments = await getPayments(req.user.id);

    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const payment = await getPaymentById(
      req.user.id,
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};