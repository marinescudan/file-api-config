const Joi =  require('joi');
// const mongoose = require('mongoose');

const slug = "category";
const modelName = "category";

// Create a Schema
// const schema = new mongoose.Schema({
//   name: String,
//   link: String,
// });

// Create a Model
// const model = mongoose.model(modelName, schema);

// async function createModel(config) {
//   const course = new Course({
//     name: config.name || 'Course Name',
//     link: config.link || 'Course Name',
//   });
//   const result = await course.save();
// }

const itemDesc = {
  slug: slug,
  modelName: modelName,
  title: `${modelName} item`,
  description: `view details of this item of the ${modelName} list`
};

const listDesc = {
  slug: slug,
  modelName: modelName,
  title: `${modelName} item list`,
  description: `view details of each ITEM from the ${modelName}`
};

const itemModel = {
  name: Joi.string().min(3).required(),
  link: Joi.string().min(1).required(),
  id: Joi.number()
};

module.exports = {
  itemDesc,
  listDesc,
  itemModel,
};