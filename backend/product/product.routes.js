const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.controller");
const { verifyToken } = require("../auth/auth.middleware");

// Routes — logic to be implemented
router.post("/", verifyToken, addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
