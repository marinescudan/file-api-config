const Joi =  require('joi');
const model = {
  name: "location",
  randerItemVM: {
    title: "Item details",
    description: "View details of the ITEM.",
    item: {}
  },
  randerListVM: {
    title: "Collection",
    description: "View details of ich ITEM from the COLECTION.",
    list: []
  },
  apiModel: {
    name: Joi.string()
      .min(3)
      .required(),
    location: Joi.string()
      .min(5)
      .required(),
    id: Joi.number()
  }
};
module.exports = model;