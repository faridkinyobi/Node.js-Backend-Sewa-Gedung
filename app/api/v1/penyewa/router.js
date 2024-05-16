const express = require('express');
const router = express();

const {Creat, getAll, getOne, update, delet,getTotal}=require('./controller')

const {authenticateUser,authorizeRoles} = require('../../../middlewares/auth');


router.post('/penyewa',authenticateUser,authorizeRoles('super admin',"admin"), Creat);
router.get('/penyewa',authenticateUser,authorizeRoles('super admin',"admin"), getAll);
router.get('/penyewaTotal',authenticateUser,authorizeRoles('super admin',"admin"), getTotal);
router.get('/penyewa/:id',authenticateUser,authorizeRoles('super admin',"admin"), getOne);
router.put('/penyewa/:id',authenticateUser,authorizeRoles('super admin',"admin"), update);
router.delete('/penyewa/:id',authenticateUser,authorizeRoles('super admin',"admin"), delet);

module.exports= router;