const express = require("express");
const router = express();

const {
  getAll,
  getAllPending,
  delet,
  OrderGagal,
  OrderStatusDP,
  OrderSukses,
  totalPending,
  totalSukses,
  OrderPreses 
} = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/totalPending",authenticateUser, authorizeRoles("admin","super admin"), totalPending);
router.get("/totalSukses",authenticateUser, authorizeRoles("admin","super admin"), totalSukses);
router.get("/getAllPending",authenticateUser, authorizeRoles("admin","super admin"), getAllPending);
router.delete("/order/:id",authenticateUser, authorizeRoles("admin","super admin"), delet);
router.put("/statusGagal/:id",authenticateUser, authorizeRoles("admin","super admin"), authenticateUser,OrderGagal);
router.put("/statusSukses/:id", authenticateUser, authorizeRoles("admin","super admin"), OrderSukses);
router.put("/statusProses/:id", authenticateUser, authorizeRoles("admin","super admin"), OrderPreses );
router.put("/statusDp/:id", authenticateUser, authorizeRoles("admin","super admin"), OrderStatusDP );
router.get("/ordersAll",authenticateUser, authorizeRoles("admin", "super admin"),getAll);
module.exports = router;
