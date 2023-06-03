const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Notification = require('../models/Notification')


//-------------------- Controller methods --------------------//
const createNotification = async(req, res) => {
  const { title, message } = req.body;
  const newNotification = new Notification({title, message });
  await newNotification.save();
  res.status(201).json(newNotification);
};

const getAllNotifications = async(req, res) => {
  try{
  const shopify_id = parseInt(req.params.id);
  const customer = await Customer.findOne({ shopify_id }).populate('notifications');
  const notifications = customer.notifications;
  res.json(notifications);
  }catch(error){
    console.log(error);
    res.status(400).json("Server error try again");
  }
};

const getNotificationById = async(req, res) => {

  const shopify_id = parseInt(req.params.id);
  const title = req.params.title;
  const { message } = req.body;
  const newNotification = new Notification({title, message });
  await newNotification.save();

  if (newNotification) {
    const customer = await Customer.findOne({ shopify_id });
    customer.notifications.push(newNotification.id);
    await customer.save();
    res.status(200).json({id: newNotification.id, title: newNotification.title, message: newNotification.message});
  } else {
    res.status(404).json({ error: 'Notification not found' });
  }
};

const updateNotification = async(req, res) => {
  const id = parseInt(req.params.id);
  const { title, message } = req.body;
  
};

const deleteNotification = async(req, res) => {
  try {
    const id = req.params.id;
    const shopify_id = parseInt(req.params.customerId);
    const deletedNotification = await Notification.findOneAndDelete({ _id: id });
    const customer = await Customer.findOne({ shopify_id });

    if (customer) {
      // Remove the deleted post's ID from the user's posts array
      customer.notifications.pull(id);
      await customer.save();
    }

    res.status(200).json("Notification deleted successfully");
  } catch (error) {
    console.error('Error deleting Notification:', error);
    res.status(400).json("internal Server Error");
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};

