const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/seed-users-orders', adminController.seedUsersAndOrders);

// /admin/orders => GET
router.get('/orders', adminController.getOrders);


// /admin/update-orders => GET
router.get('/update-orders', adminController.updateNumberOfOrders);



module.exports = router;
