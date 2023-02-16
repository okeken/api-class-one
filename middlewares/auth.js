const yup = require("yup")

const validateLogin=(schema)=>(req,res,next)=>{
    schema.validate()
}