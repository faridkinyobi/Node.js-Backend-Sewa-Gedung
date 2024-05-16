const express = require("express");
const router = express();

const {
  getAll,
  getAlltotalPending,
  Statuspending,
  OrderGagal,
  OrderSukses,
  getAlltotalOrder,
  delet,
} = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/totalPending", getAlltotalPending);
router.get("/total", getAlltotalOrder);
router.get("/status", Statuspending);
router.delete("/order/:id", delet);
router.put("/statusGagal/:id", OrderGagal);
router.put("/statusSukses/:id", OrderSukses);
router.get(
  "/ordersAll",
  authenticateUser,
  authorizeRoles("admin", "super admin"),
  getAll
);
module.exports = router;
