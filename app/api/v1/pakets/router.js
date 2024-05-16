const express = require("express");
const router = express();

const {
  Creat,
  getAll,
  getharga,
  update,
  delet,
  getOne,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post("/pakets", authenticateUser, authorizeRoles("super admin"), Creat);
router.get("/pakets", authenticateUser, authorizeRoles("admin","super admin"),getAll);
router.get("/pakets/:id", authenticateUser, authorizeRoles("super admin"), getOne);
router.put("/pakets/:id", authenticateUser, authorizeRoles("super admin"), update);
router.delete("/pakets/:id", authenticateUser, authorizeRoles("super admin"), delet);

module.exports = router;
