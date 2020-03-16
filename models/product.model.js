const Joi =  require('joi');
const mongoose = require('mongoose');

const slug = "product";
const modelName = slug;
// View model for one item
const itemDesc = {
  slug: slug,
  modelName: modelName,
  title: `${modelName} item`,
  description: `view details of this item of the ${modelName} list`
};
// View model for the lsit
const listDesc = {
  slug: slug,
  modelName: modelName,
  title: `${modelName} item list`,
  description: `view details of each ITEM from the ${modelName}`
};
// api Schema and validation
const itemModel = {
  name: Joi
  .string()
  .required()
  .min(2)
  .max(64),
  link: Joi
  .string()
  .required()
  .min(2)
  .max(64),
};
//access routes
const viewRoute = `/view/${slug}`;
const apiRoute = `/api/${slug}`;
// DB Schemaand validation
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
  },
});
// Create a Model
const model = new mongoose.model(modelName, schema);
module.exports = {
  viewRoute,
  apiRoute,
  slug,
  modelName,
  itemDesc,
  listDesc,
  itemModel,
  schema,
  model
};