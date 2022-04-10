const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const Store = require('../models/store');

router.route('/stores')
  .get(getAllStores);

async function getAllStores(req, res, next) {
  logger.info("stores.js - getAllStores");

  // Destructure page and limit and set default values.
  const { page = 1, limit = 10 } = req.query;

  try {
    // Execute query with page and limit values.
    const stores = await Store.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total documents in the Store collection.
    const countStores = await Store.countDocuments();

    // Return response with stores, total pages, and current page.
    res.json({
      data: stores,
      page: page,
      pages: Math.ceil(countStores / limit),
      limit: limit,
      total: Math.ceil(countStores / limit) * limit
    });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = router;
