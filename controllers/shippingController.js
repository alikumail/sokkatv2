const Shipping = require('../models/Shipping');

// GET all shipping methods
const getAllShippingMethods = async (req, res) => {
  try {
    const shippingMethods = await Shipping.find();
    res.status(200).json({ success: true, data: shippingMethods });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// GET a specific shipping method by id
const getShippingMethodById = async (req, res) => {
  const { id } = req.params;
  try {
    const shippingMethod = await Shipping.findById(id);
    if (!shippingMethod) {
      return res.status(404).json({ success: false, error: 'Shipping method not found' });
    }
    res.status(200).json({ success: true, data: shippingMethod });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// CREATE a new shipping method
const createShippingMethod = async (req, res) => {
  const { name, description, price, isActive } = req.body;
  try {
    const newShippingMethod = await Shipping.create({
      name,
      description,
      price,
      isActive,
    });
    res.status(201).json({ success: true, data: newShippingMethod });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid data' });
  }
};

// UPDATE a shipping method by id
const updateShippingMethodById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, isActive } = req.body;
  try {
    const updatedShippingMethod = await Shipping.findByIdAndUpdate(
      id,
      { name, description, price, isActive },
      { new: true }
    );
    if (!updatedShippingMethod) {
      return res.status(404).json({ success: false, error: 'Shipping method not found' });
    }
    res.status(200).json({ success: true, data: updatedShippingMethod });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid data' });
  }
};

// DELETE a shipping method by id
const deleteShippingMethodById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShippingMethod = await Shipping.findByIdAndDelete(id);
    if (!deletedShippingMethod) {
      return res.status(404).json({ success: false, error: 'Shipping method not found' });
    }
    res.status(200).json({ success: true, data: deletedShippingMethod });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = {
  getAllShippingMethods,
  getShippingMethodById,
  createShippingMethod,
  updateShippingMethodById,
  deleteShippingMethodById,
};
