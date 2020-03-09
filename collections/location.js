const Joi = require("joi");
const colection = {
  name: "location",
  apiList: [
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
  ],
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
module.exports = colection;
