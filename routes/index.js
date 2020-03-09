const express = require('express');
const router = express.Router();

const index_model = {
    title: 'My Express App',
    message: 'Hello',
    userName: 'Jhon'
};

router.get('/', (req, res) => {
    res.render('index', index_model);
});

module.exports = router;