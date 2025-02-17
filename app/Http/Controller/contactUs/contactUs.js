
const contactSchema = require("../../../Models/contactUsModel")
const contact_us = {};
contact_us.contactSave = async (req,res)=>{
    try {
        
        const {fname, lname,email,phone,message } = req.body;
        if(!email){
            res.status(400).json({ message: "Email is Required", data: "" , success : false , status : 400 });
        }
        const contactObj = new contactSchema({
            fname : fname,
            lname : lname,
            email : email,
            phoneNumber : phone,
            message : message
        })

        const contactResult = await contactObj.save();
        if(contactResult){
            return res.status(200).json({ message: "Successfully Insert Contact Us Data", success: true, data: contactResult,  status : 200 });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}

contact_us.contactGet = async (req,res)=>{
    try {
        const contactResult = await contactSchema.find();
        if(contactResult){
            return res.status(200).json({ message: "Successfully fetch contact Us Data", success: true, data: contactResult });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}

module.exports = contact_us;