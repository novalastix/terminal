const express = require('express');
const router = express.Router();

// Clean mapping: URL -> Controller function
router.get('/', (req,res) => {
    res.render('index',
    {
        title: 'Admin Terminal 2'
    });
});

module.exports = router;