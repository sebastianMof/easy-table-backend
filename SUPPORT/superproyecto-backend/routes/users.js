const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.json({
        title: 'This will be a resource of type user'
    })
});

module.exports = router;
