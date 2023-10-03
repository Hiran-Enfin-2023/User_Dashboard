const multer = require("multer");

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        const filename = `image-${Date.now()}.${file.originalname}`
        cb(null,filename)
    }
})

const filterFile = (req,file,cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null,true)
    }else{
        cb(null, false)
        return cb(new Error("Only .jpg , .png and jpeg are allowed"))
    }
};

const upload = multer({
    storage:storage,
    fileFilter: filterFile
})


module.exports = upload;