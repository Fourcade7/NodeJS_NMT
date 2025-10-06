
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

class CategoryController {

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


            let categoryList=await prisma.category.findMany();
            res.send(categoryList);

        }catch(error){
            res.status(400).send(error);
        }
    }

    async getBy(req,res){

        try{
            let id=Number(req.params.id);
            let category=await prisma.category.findUnique({
                where:{id:id},
                include:{
                    products:true
                }
            });
            if(!category){
                return res.status(404).send({message:"Category not found"});
            }
            res.status(200).send(category);
        }catch(error){
            res.status(400).send(error);
        }
        

    }

    async add(req,res){
        try{
             let { name } = req.body;
             let category = await prisma.category.create({
                data:{
                    name
                }
             }); 
             res.status(201).json(category);  
        }catch(error){
             res.status(400).send({ error: error });
        }
    }

    async update(req,res){
        try{
             
            let id=Number(req.params.id);
            let { name,nameuz,nameen } = req.body;
             let check=await prisma.category.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

            if(!req.files || !req.files.imageKey){
               //return res.status(400).send({message:"No file to upload"});
               let category = await prisma.category.update({
                            where:{id},
                            data:{
                                name,
                                nameuz,
                                nameen,
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

                        let category = await prisma.category.update({
                            where:{id},
                            data:{
                                name,
                                nameuz,
                                nameen,
                                imgUrl:`http://217.199.252.10:3000/uploads/${imageName}`
                            }
                        })
                        //res.send(category);
                    });

             }

            

            
             res.status(200).send({message:"Category updated"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


      async delete(req,res){
        try{
             
             let id=Number(req.params.id);
             
             let check=await prisma.category.findUnique({
                where:{
                    id
                }
             })

             if(!check){
                return res.status(404).send({message:"Not found"})
             }

             let category= await prisma.category.delete({
                where:{id}
             })

             res.status(200).send({message:"Category deleted"});
             

        }catch(error){
             res.status(400).send({ error: error });
        }
    }


    /*

       {
        name: "apple.jpg",       // original fayl nomi
        data: <Buffer ...>,      // faylning binary ma'lumotlari
        size: 12345,             // baytlarda o‘lcham
        mimetype: "image/jpeg",  // faylning MIME turi (jpg, png, pdf va h.k.)
        encoding: "7bit",        // (ba'zan bo‘ladi)
        tempFilePath: "",        // agar temp fayl ishlatilsa
        truncated: false,        // fayl to‘liq yuklandimi yoki yo‘q
        md5: "9a0364b9e99bb480...", // faylning md5 checksum
        mv: [Function: mv]       // faylni serverga ko‘chirish funksiyasi
        }

    */

    async addImage(req,res){

        try{

            let name=req.body.name;
            let nameuz=req.body.nameuz;
            let nameen=req.body.nameen;

            if(!req.files || !req.files.imageKey){
               return res.status(400).send({message:"No file to upload"});
            }

            // if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
            // return res.status(400).send({ message: "Invalid content type" });
            // }

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

                let category = await prisma.category.create({
                    data:{
                        name,
                        nameuz,
                        nameen,
                        imgUrl:`http://217.199.252.10:3000/uploads/${imageName}`
                    }
                })

                res.send(category);


            });

        }catch(error){
            res.status(400).send({message:error});
        }
    }

    







}


export default new CategoryController();