const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/pembayaran", authenticateUser, authorizeRoles("admin","super admin"), index);
router.get("/pembayaran/:id", authenticateUser, authorizeRoles("admin","super admin"), find);
router.put("/pembayaran/:id", authenticateUser, authorizeRoles("admin","super admin"), update);
router.delete("/pembayaran/:id", authenticateUser, authorizeRoles("admin","super admin"), destroy);
router.post("/pembayaran", authenticateUser, authorizeRoles("admin","super admin"), create);

module.exports = router;
