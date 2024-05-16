const express = require("express");
const router = express();

const {
  create,
  getOne,
  index,
  destroy,
  update,
} = require("./controller");

const { authenticatePelanggan } = require("../../../middlewares/auth");

router.get('/laporan', index);
router.get('/laporan/:id', getOne);
router.put('/laporan/:id', update);
router.delete('/laporan/:id', destroy);
router.post('/laporan', create);

module.exports = router;
