
import express from "express";
import itemController from "../controllers/ItemController.js";

const router = express.Router();



router.get("/getall",itemController.getAll);
router.get("/getby/:id",itemController.getBy);
router.post("/add",itemController.add);
router.patch("/update/:id",itemController.update);
router.delete("/delete/:id",itemController.delete);
router.post("/image",itemController.addImage);


export default router;
