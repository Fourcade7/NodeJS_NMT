import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import categoryRouter from "./routes/CategoryRoutes.js";
import productRouter from "./routes/ProductRoutes.js";
import itemRouter from "./routes/ItemRoutes.js";


const app=express();

// 1. Avval CORS
app.use(cors());

// 2. Keyin FileUpload middleware (FAQT BIR MARTA)
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
    abortOnLimit: true,
    createParentPath: true, // BU NI QO'SHING - muhim!
    useTempFiles: false, // BU NI QO'SHING
    tempFileDir: '/tmp/'
}));

// 3. Keyin Body parserlar
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 4. Static folder
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));




//Routes

app.use("/category",categoryRouter);
app.use("/product",productRouter);
app.use("/item",itemRouter);





const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} is running`);
});











/*
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  abortOnLimit: true, // limitdan oshsa xato qaytaradi
}));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); //folder to public
//app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
*/