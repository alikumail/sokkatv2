// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();

// Import controller
const controller = require('../controllers/notificationController');

// Define routes
router.post('/', controller.createNotification);
router.get('/:id/customer', controller.getAllNotifications);
router.get('/:title/customer/:id', controller.getNotificationById);
router.put('/:id', controller.updateNotification);
router.delete('/:id/customer/:customerId', controller.deleteNotification);

module.exports = router;