
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

class ItemController {

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


            let itemList=await prisma.item.findMany();
            res.send(itemList);

        }catch(error){
            res.status(400).send(error);
        }
    }

    async getBy(req,res){

        try{
            let id=Number(req.params.id);
            let item=await prisma.item.findUnique({
                where:{id:id},
                include:{
                    product:true
                }
            });
            if(!item){
                return res.status(404).send({message:"item not found"});
            }
            res.status(200).send(item);
        }catch(error){
            res.status(400).send(error);
        }
        

    }

    async add(req,res){
        try{
             let { name,productId } = req.body;
             let item = await prisma.item.create({
                data:{
                    name,
                    productId
                }
             }); 
             res.status(201).json(item);  
        }catch(error){
             res.status(400).send({ error: error });
        }
    }

    async update(req,res){
        try{
             
             let id=Number(req.params.id);
             let { name,nameuz,nameen,productId,count,ref,size,categoryId } = req.body;
             
             let check=await prisma.item.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

              if(!req.files || !req.files.imageKey){
               //return res.status(400).send({message:"No file to upload"});
               let item = await prisma.item.update({
                            where:{id},
                            data:{
                                name,
                                nameuz,
                                nameen,
                                count,
                                ref,
                                size
                            }
                 })

             }else{
                    let imageKey = req.files.imageKey;
                    let imageName=imageKey.name.trim().replaceAll(" ","");
                    
                    let uploadPath="./uploads/"+imageName;

                    imageKey.mv(uploadPath, async (err)=>{
                        if(err){
                            return res.status(500).send({message:err.message});
                        }

                        let item = await prisma.item.update({
                            where:{id},
                            data:{
                                name,
                                nameuz,
                                nameen,
                                count,
                                ref,
                                size,
                                imgUrl:`http://217.199.252.10:3000/uploads/${imageName}`
                            }
                        })
                        //res.send(category);
                    });
             }

             

             res.status(200).send({message:"item updated"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


      async delete(req,res){
        try{
             
             let id=Number(req.params.id);
             
             let check=await prisma.item.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

             let item= await prisma.item.delete({
                where:{id}
             })

             res.status(200).send({message:"item deleted"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


    async addImage(req,res){

        try{

            let name=req.body.name;
            let nameuz=req.body.nameuz;
            let nameen=req.body.nameen;
            let productId=Number(req.body.productId);
            let count=req.body.count;
            let ref=req.body.ref;
            let size=req.body.size;
            

            let check= await prisma.product.findUnique({
                where:{
                    id:productId
                }
            })

            if(!check){
               return res.status(400).send({message:"Product Not found"});
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

                let item = await prisma.item.create({
                    data:{
                        name,
                        nameuz,
                        nameen,
                        productId,
                        ref,
                        size,
                        count,
                        imgUrl:`http://217.199.252.10:3000/uploads/${imageName}`
                    }
                })

                res.send(item);


            });

        }catch(error){
            res.status(400).send({message:error});
        }
    }

    







}


export default new ItemController();