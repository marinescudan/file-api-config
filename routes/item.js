/* Import modules */
const express = require('express');
const router = express.Router();
const Joi =  require('joi');
const debug = require('debug')('app:debugStart');
const mongoose = require('mongoose');

/* Set app dataModels */
const models = require('../models/index');
router.get('/', async (req, res) => {
   const currentModelType = models.types[req.$urlParams.modelType];
   const items = await currentModelType.model.find().sort('name');
   if (req.$urlParams.requestType === 'api') {
      res.send(items);
   }
   if (req.$urlParams.requestType === "view") {
      // add the desc and title to the model
      const renderItems = models.getListData(items, currentModelType.listDesc);
      res.render("list", renderItems);
   }
});

router.get('/:id', async (req, res) => {
   const currentModelType = models.types[req.$urlParams.modelType];
   let item = await currentModelType.model.findByIdAndUpdate(req.params.id);
   if (req.$urlParams.requestType === 'api') {
      // If not exists, return 404
      if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      res.send(item);
   }
   if (req.$urlParams.requestType === "view") {
      // add the desc and title to the model
      const renderItem = models.getItemData(item, currentModelType.itemDesc);
      // If not exists, return 404
      if (!renderItem) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      res.render("item", renderItem);
   }
});

router.post('/', async (req, res) => {
   // Validate object by item schema
   const { error } = Joi.validate(req.body, models.types[req.$urlParams.modelType].itemModel);
   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);
   const currentModelType = models.types[req.$urlParams.modelType];
   // Create new item
   try {
      let item = new currentModelType.model(req.body);
      // Add item to list
      item = await item.save();
      // Return the new item
      res.send(item);
   } catch (error) {
      console.log(error);
      res.status(400).send(error)
   }
});

router.put('/:id', async (req, res) => {
   // Edit first and return
   const currentModelType = models.types[req.$urlParams.modelType];
   // Validate object by item schema
   const { error } = Joi.validate(req.body, models.types[req.$urlParams.modelType].itemModel);
   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);
   // Update item
   try {
      let item = await currentModelType.model.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new: true}
      );
      // Return the updated item
      res.send(item);
   } catch (error) {
      // If not exists, return 404
      if (!item) return res.status(404).send(error);
   }
});

router.delete('/:id', async (req, res) => {
   // Edit first and return
   const currentModelType = models.types[req.$urlParams.modelType];
   // Lookup the item & Delete item from db
   try {
      let item = await currentModelType.model.findByIdAndRemove( req.params.id );
      // Return the updated item
      res.send(item);
   } catch (error) {
      // If not exists, return 404
      return res.status(404).send(error);
   }
});

module.exports = router;