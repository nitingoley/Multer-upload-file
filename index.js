const express = require('express');
const app = express();
const port = process.env.PORT || 9000
const ejs  = require('ejs');
const path = require('path');
const multer = require("multer");



app.use(express.urlencoded({extended:false}));
app.set("view engine" , "ejs");
app.set('views', path.resolve("./views"))

// // 
const storage = multer.diskStorage({
    destination : function(req, file , cb){
        return cb(null , ('./uploads'));
    },
    filename : function(req , file , cb){
        return cb(null , `${Date.now()}- ${file.originalname}`);
    }
})

const upload = multer({storage : storage})


app.post("/upload" , upload.single("UploadCv") , (req , res)=>{
          console.log(req.body);
          console.log(req.file);
  return res.status(200).render("home")
           
        
})

app.get("/", (req , res)=>{
  
    return res.render("home")
  
})

app.listen(port , ()=>{
    console.log(`Port running on ${port}`);
})