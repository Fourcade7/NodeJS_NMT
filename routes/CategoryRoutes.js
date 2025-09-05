
import express from "express";

const categoryRouter = express.Router();


categoryRouter.get("/user",(req,res)=>{
    res.send("nima gap USER");
})


export default categoryRouter;
