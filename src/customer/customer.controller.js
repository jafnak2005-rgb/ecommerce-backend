import {
  getCustomers,
  getCustomerById,
  deleteCustomer,
} from "./customer.service.js";


export const getAll = async (req, res) => {
  try {
    const customers = await getCustomers();

    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);

    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};


export const remove = async (req, res) => {
  try {
    const result = await deleteCustomer(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};