import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import categoryRouter from "./routes/CategoryRoutes.js";
import productRouter from "./routes/ProductRoutes.js";
import itemRouter from "./routes/ItemRoutes.js";


const app=express();

app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); //folder to public


app.use(express.json());



//Routes

app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/item",itemRouter);





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});
