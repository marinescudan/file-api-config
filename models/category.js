const Joi =  require('joi');
const model = {
  name: "category",
  randerItemVM: {
    title: "Item details",
    description: "View details of the ITEM.",
    item: {
      id: 1,
      name: "Bob",
      link: "http://domain.com/Bob"
    }
  },
  randerListVM: {
    title: "Collection",
    description: "View details of ich ITEM from the COLECTION.",
    items: [
      {
        id: 1,
        name: "Jhon",
        link: "http://domain.com/Jhon"
      },
      {
        id: 2,
        name: "Bob",
        link: "http://domain.com/Bob"
      }
    ]
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