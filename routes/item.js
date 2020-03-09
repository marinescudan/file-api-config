/* Import modules */
const express = require('express');
const router = express.Router();
const Joi =  require('joi');
const debug = require('debug')('app:debugStart');


/* Set app api models */
const models = require('../models/index');


/* Create DB array - todo: set collection using collectionBuilder from models */
const collections = require('../collections/index');


router.get('/', (req, res) => {
   if (req.$urlParams.requestType === 'api') {
      const apiList = collections[req.$urlParams.modelType].apiList;
      res.send(apiList);
   }
   if (req.$urlParams.requestType === "view") {
      const vmList = models[req.$urlParams.modelType].randerListVM;
      res.render("list", vmList);
   }
});

router.get('/:id', (req, res) => {
   if (req.$urlParams.requestType === 'api') {
      const list = collections[req.$urlParams.modelType].apiList;
      const item = list.find(
        item => item.id === parseInt(req.params.id)
      );
      // If not exists, return 404
      if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      if (req.$urlParams.requestType === "api") res.send(item);
   }

   if (req.$urlParams.requestType === "view") {
      item = models[req.$urlParams.modelType].randerItemVM;
      // If not exists, return 404
      if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);
      // Return the item
      if (req.$urlParams.requestType === "view") res.render("item", item);
   }

});

router.post('/', (req, res) => {
   // Validate object by item schema
   const modelType = req.originalUrl.split('/')[2];
   const collectionType = req.originalUrl.split('/')[2];
   const { error } = Joi.validate(req.body, models[modelType].name);

   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);

   // Create new item
   let item = {};

   item = req.body
   item.id = collections[collectionType].length + 1,

   // Add item to DB
   collections[collectionType].push(item);

   // Return the new item
   res.send(item);
});

router.put('/:id', (req, res) => {

   // Lookup the item
   let collectionType = req.originalUrl.split('/')[2];
   const item = collections[collectionType].find(c => c.id === parseInt(req.params.id));

   // If not exists, return 404
   if(!item) return res.status(404).send(`The item with the given id ${req.params.id} was not found`);

   // Validate object by item schema
   const modelType = req.originalUrl.split('/')[2];
   const { error } = Joi.validate(req.body, models[modelType].name);

   // If invalid, return 400 - Bad request
   if (error) return res.status(400).send(error.details[0].message);

   // Update item
   item = req.body;

   // Return the updated item
   res.send(item);
});

router.delete('/:id', (req, res) => {

   // Lookup the item
   let collectionType = req.originalUrl.split('/')[2];
   const item = collections[collectionType].find(c => c.id === parseInt(req.params.id));

   // If not exists, return 404
   if(!item) return; res.status(404).send(`The item with the given id ${req.params.id} was not found`);

   // Delete item
   const index = collections[collectionType].indexOf(item);
   collections[collectionType].splice(index, 1);

   // Return the updated item
   res.send(item);
});

module.exports = router;