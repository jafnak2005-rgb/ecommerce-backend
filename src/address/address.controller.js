import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "./address.service.js";

export const create = async (req, res) => {
  try {
    const address = await createAddress(
      req.user.id,
      req.body
    );

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const addresses = await getAddresses(req.user.id);

    res.status(200).json(addresses);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const address = await getAddressById(
      req.user.id,
      req.params.id
    );

    res.status(200).json(address);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const address = await updateAddress(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteAddress(
      req.user.id,
      req.params.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};