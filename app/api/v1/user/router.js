const express = require('express');
const router = express();

const { signupAdmin,getAll,getAllPel,delet,changPassword,update,getOne,getTotal}=require('./controller')
const {
    authenticateUser,
    authorizeRoles,
  } = require("../../../middlewares/auth");
  
router.post('/auth/signup',signupAdmin);
router.post('/auth/change', authenticateUser,authorizeRoles("super admin"),changPassword);
router.get('/getadmin', authenticateUser, authorizeRoles("super admin"),getAll);
router.get('/getpelanggan', authenticateUser,authorizeRoles("super admin"), getAllPel);
router.get("/getaOnedmin/:id",authenticateUser, authorizeRoles("admin","super admin"),  getOne);
router.get('/pelangganTotal',authenticateUser, authorizeRoles("admin","super admin"), getTotal);
router.put("/UpdateAdmin/:id", authenticateUser, authorizeRoles("super admin"), update);
router.delete('/admin/:id',authenticateUser,authorizeRoles("super admin"), delet);

module.exports= router;