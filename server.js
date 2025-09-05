import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import categoryRouter from "./routes/CategoryRoutes.js";


const app=express();

app.use(cors());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); //folder to public


app.use(express.json());



//Routes

app.use("/category",categoryRouter);





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});
