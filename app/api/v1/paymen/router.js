const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');
//authenticateUser,authorizeRoles('super admin')
router.get('/payments', authenticateUser, authorizeRoles("super admin"),index);
router.get('/payments/:id',authenticateUser, authorizeRoles("super admin"),find);
router.put('/payments/:id',authenticateUser, authorizeRoles("super admin"),update);
router.delete('/payments/:id',authenticateUser, authorizeRoles("super admin"),destroy);
router.post('/payments', authenticateUser, authorizeRoles("super admin"),create);

module.exports = router;