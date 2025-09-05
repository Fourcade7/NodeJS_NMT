import express from "express";
import cors from "cors";
import categoryRouter from "./routes/CategoryRoutes.js";

const app=express();
app.use(cors());

app.use(express.json());




app.use("/my",categoryRouter);





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
