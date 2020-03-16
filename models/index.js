function getListData(items = [], data = {}) {
    data.items = items;
    return data;
}

function getItemData(item = {}, data = {}) {
    data.item = item;
    return data;
}

module.exports = {
    modelType: require('./modelType.js'),
    getListData,
    getItemData
};