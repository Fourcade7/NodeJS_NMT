
import express from "express";
import productController from "../controllers/ProductController.js";

const router = express.Router();



router.get("/getall",productController.getAll);
router.get("/getby/:id",productController.getBy);
router.post("/add",productController.add);
router.patch("/update/:id",productController.update);
router.delete("/delete/:id",productController.delete);
router.post("/image",productController.addImage);


export default router;
