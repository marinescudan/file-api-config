const Joi =  require('joi');
const model = {
  name: "group",
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
    description: Joi.string()
      .min(32)
      .required(),
    id: Joi.number()
  }
};
module.exports = model;