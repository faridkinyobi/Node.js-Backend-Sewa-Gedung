const express = require('express');
const router = express();
const { create,destroy } = require('./controller');
const upload = require('../../../middlewares/multer');

router.post('/images', upload.single('avatar'), create);
router.delete('/images/:image', destroy);
module.exports = router;