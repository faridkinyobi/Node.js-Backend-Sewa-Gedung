const express = require('express');
const router = express();

const {Creat, getAll, getOne, update, delet,updateJadwalStatus}= require('./controller')

const {authenticateUser,authorizeRoles} = require('../../../middlewares/auth');

router.post('/jadwal', authenticateUser,authorizeRoles('super admin'),Creat);
router.get('/jadwal', authenticateUser,authorizeRoles('super admin'), getAll);
router.get('/jadwal/:id',authenticateUser,authorizeRoles('super admin'), getOne);
router.put('/jadwal/:id',authenticateUser,authorizeRoles('super admin'), update);
router.put('/JadwalStatus/:id',authenticateUser,authorizeRoles('super admin'), updateJadwalStatus);
router.delete('/jadwal/:id', delet);

module.exports= router;