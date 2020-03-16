let models = { types: {} };

models.types.user = require('./user.model.js')
models.types.product = require('./product.model.js')

models.getListData = function (items = [], data = {}) {
    data.items = items;
    return data;
}
models.getItemData = function (item = {}, data = {}) {
    data.item = item;
    return data;
}
module.exports = models;