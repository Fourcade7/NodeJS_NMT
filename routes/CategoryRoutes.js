
import express from "express";
import categoryController from "../controllers/CategoryController.js";

const router = express.Router();



router.get("/getall",categoryController.getAll);
router.get("/getby/:id",categoryController.getBy);
router.post("/add",categoryController.add);
router.patch("/update/:id",categoryController.update);
router.delete("/delete/:id",categoryController.delete);
router.post("/image",categoryController.addImage);


export default router;
