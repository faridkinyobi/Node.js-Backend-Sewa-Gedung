const express = require("express");
const router = express();

const { create, getOne, index, destroy, update } = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/laporan", authenticateUser, authorizeRoles("admin","super admin"), index);
router.get("/laporan/:id", authenticateUser, authorizeRoles("admin","super admin"),getOne);
router.put("/laporan/:id",authenticateUser, authorizeRoles("admin","super admin"), update);
router.delete("/laporan/:id", authenticateUser, authorizeRoles("admin","super admin"),destroy);
router.post("/laporan",authenticateUser, authorizeRoles("admin","super admin"),create);

module.exports = router;
