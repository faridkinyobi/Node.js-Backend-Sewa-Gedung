const express = require('express');
const router = express();

const { signupAdmin,getAll,getAllPel,delet}=require('./controller')

router.post('/auth/signup',signupAdmin);
router.get('/getadmin', getAll);
router.get('/getpelanggan', getAllPel);
router.delete('/admin/:id', delet);

module.exports= router;