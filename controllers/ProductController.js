
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

class ProductController {

     async  universal(req,res) {
        let data=req.body;
        let id=req.params.id;
        let h=req.headers["pr"];
        let q=req.query.q;
        res.send({
            userid:data.userid,
            username:data.name,
            message:"success",
            id:id,
            q:q,
            h:h,
            headers:req.headers
        });
    }

    async  getAll(req,res) {

        try{


            let productList=await prisma.product.findMany();
            res.send(productList);

        }catch(error){
            res.status(400).send(error);
        }
    }

    async getBy(req,res){

        try{
            let id=Number(req.params.id);
            let product=await prisma.product.findUnique({
                where:{id:id},
                include:{
                    items:true
                }
            });
            if(!product){
                return res.status(404).send({message:"Product not found"});
            }
            res.status(200).send(product);
        }catch(error){
            res.status(400).send(error);
        }
        

    }

    async add(req,res){
        try{
             let { name,categoryId } = req.body;
             let product = await prisma.product.create({
                data:{
                    name,
                    categoryId
                }
             }); 
             res.status(201).json(product);  
        }catch(error){
             res.status(400).send({ error: error });
        }
    }

    async update(req,res){
        try{
             
             let id=Number(req.params.id);
             let { name,categoryId } = req.body;
             let check=await prisma.product.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

             let product= await prisma.product.update({
                where:{id},
                data:{
                    name
                }
             })

             res.status(200).send({message:"Product updated"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


      async delete(req,res){
        try{
             
             let id=Number(req.params.id);
             
             let check=await prisma.product.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

             let product= await prisma.product.delete({
                where:{id}
             })

             res.status(200).send({message:"product deleted"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


    async addImage(req,res){

        try{

            let name=req.body.name;
            let categoryId=Number(req.body.categoryId);

            let check= await prisma.category.findUnique({
                where:{
                    id:categoryId
                }
            })

            if(!check){
               return res.status(400).send({message:"Category Not found"});
            }

            if(!req.files || !req.files.imageKey){
               return res.status(400).send({message:"No file to upload"});
            }

            // uploads papkaga saqlash
            if (!fs.existsSync("./uploads")) {
                fs.mkdirSync("./uploads");
            }
            let imageKey = req.files.imageKey;
            let imageName=imageKey.name.trim().replaceAll(" ","");
            
            let uploadPath="./uploads/"+imageName;

            imageKey.mv(uploadPath, async (err)=>{
                if(err){
                    return res.status(500).send({message:err.message});
                }

                let product = await prisma.product.create({
                    data:{
                        name,
                        categoryId,
                        imgUrl:`http://localhost:3000/uploads/${imageName}`
                    }
                })

                res.send(product);


            });

        }catch(error){
            res.status(400).send({message:error});
        }
    }

    







}


export default new ProductController();