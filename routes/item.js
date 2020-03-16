/* Import modules */
const express = require('express');
const router = express.Router();
const Joi =  require('joi');
const debug = require('debug')('app:debugStart');

/* Create DB array - todo: set collection using collectionBuilder from models */
const db = require('../db/index');

/* Set app dataModels */
const models = require('../models/index');

router.get('/', (req, res) => {
   const items = db[req.$urlParams.modelType];

   if (req.$urlParams.requestType === 'api') {
      res.send(items);
   }
   if (req.$urlParams.requestType === "view") {
      // add the desc and title to the model
      const renderItems = models.getListData(items, models[req.$urlParams.modelType].listDesc);
      res.render("list", renderItems);
   }
});

router.get('/:id', (req, res) => {
   const list = db[req.$urlParams.modelType];
   const item = list.find(
      item => item.id === parseInt(req.params.id)
   );

   if (req.$urlParams.requestType === 'api') {
      // If not exists, return 404
      if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      if (req.$urlParams.requestType === "api") res.send(item);
   }

   if (req.$urlParams.requestType === "view") {
      // add the desc and title to the model 
      const renderItem = models.getItemData(item, models[req.$urlParams.modelType].itemDesc);
      // If not exists, return 404
      if (!renderItem) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      if (req.$urlParams.requestType === "view") res.render("item", renderItem);
   }

});

router.post('/', (req, res) => {
   // Validate object by item schema
   const { error } = Joi.validate(req.body, models[req.$urlParams.modelType].itemModel);

   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);

   // Create new item
   let item = {};
   item = req.body
   item.id = db[req.$urlParams.modelType].length + 1;

   // Add item to list
   db[req.$urlParams.modelType].push(item);

   // Return the new item
   res.send(item);
});

router.put('/:id', (req, res) => {

   // Lookup the item
   let item = db[req.$urlParams.modelType].find(
      item => item.id === parseInt(req.params.id)
   );
   // If not exists, return 404
   if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);

   // Validate object by item schema
   const { error } = Joi.validate(req.body, models[req.$urlParams.modelType].itemModel);

   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);

   // Update item doesnt work
   const index = db[req.$urlParams.modelType].indexOf(item);
   item = req.body;
   db[req.$urlParams.modelType][index] = item;

   // Return the updated item
   res.send(item);
});

router.delete('/:id', (req, res) => {

   // Lookup the item
   let collectionType = req.$urlParams.modelType;
   const item = db[collectionType].find(c => c.id === parseInt(req.params.id));

   // If not exists, return 404
   if(!item) return; res.status(404).send(`The item with the given id ${req.params.id} was not found`);

   // Delete item from db
   const index = db[collectionType].indexOf(item);
   db[collectionType].splice(index, 1);

   // Return the updated item
   res.send(item);
});

module.exports = router;