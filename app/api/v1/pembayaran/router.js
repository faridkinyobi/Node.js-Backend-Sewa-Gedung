const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
  authenticatePelanggan
} = require('../../../middlewares/auth');

router.get('/pembayaran',index);
router.get('/pembayaran/:id',find);
router.put('/pembayaran',authenticatePelanggan,update);
router.delete('/pembayaran/:id',destroy);
router.post('/pembayaran',authenticatePelanggan, create);

module.exports = router;