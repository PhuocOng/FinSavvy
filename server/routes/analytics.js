const express = require('express');
const router = express.Router();

router.get('/category-summary', (req, res) => {
    res.json({
        message: 'Category summary endpoint is under construction',
    });
})


router.get('/monthly-summary', (req, res) => {
    res.json({
        message: 'Monthly summary endpoint is under construction',
    });
})

module.exports = router;