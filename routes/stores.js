const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Store = require('../models/store');

// 1. GET Stores.
router.route('/stores')
  .get(getAllStores);

async function getAllStores(req, res) {
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

// 2. POST Store.
router.route('/store')
  .post(
    // Validate input.
    check('name')
      .not()
      .isEmpty()
      .withMessage('Is required')
      .trim()
      .escape()
      .isString()
      .withMessage('Must be a valid string')
      .custom(value => {
        return Store.countDocuments({"name": value}).then(store => {
          if (store) {
            return Promise.reject('Store name already in use');
          }
        });
      }),
    check('cuit')
      .not()
      .isEmpty()
      .withMessage('Is required')
      .trim()
      .escape()
      .isString()
      .withMessage('Must be a valid string')
      .isLength({ min: 3 })
      .withMessage('Must have at least 3 characters')
      .custom(value => {
        return Store.countDocuments({"cuit": value}).then(store => {
          if (store) {
            return Promise.reject('Store cuit already in use');
          }
        });
      }),
    check('concepts')
      .not()
      .isEmpty()
      .withMessage('Is required')
      .isArray({min: 1})
      .withMessage('Must be a valid array with at least a concept'),
    check('currentBalance')
      .not()
      .isEmpty()
      .withMessage('Is required')
      .trim()
      .escape()
      .isFloat({ min: 0 })
      .withMessage('The min value is 0'),
    check('active')
      .optional()
      .isBoolean()
      .withMessage('Must be a boolean. By default is true'),
    check('lastSale')
      .not()
      .isEmpty()
      .withMessage('Is required')
      .isDate()
      .withMessage('Must be a valid date in the format yyyy-mm-dd'),
    createStore);

async function createStore(req, res) {
    logger.info("stores.js - createStore");

    // Finds the validation errors in this request and wraps them in an object with handy functions.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let store = new Store();

      store.name = req.body.name;
      store.cuit = req.body.cuit;
      store.concepts = req.body.concepts;
      store.currentBalance = req.body.currentBalance;
      store.active = ((typeof req.body.active !== 'undefined')?req.body.active:true);
      store.lastSale = req.body.lastSale;

      await Store.create(store);
  
      logger.info("Store created")
  
      // Return response with the new store created.
      res.json(store);
    } catch (err) {
      console.error(err.message);
    }
}

module.exports = router;
