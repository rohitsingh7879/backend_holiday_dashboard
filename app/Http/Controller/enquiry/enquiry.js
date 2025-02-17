const enquirySchema = require("../../../Models/enquiryModel")
const enquiry = {};

enquiry.enquirySave = async (req,res)=>{
    try {
        
        const {cruise_package,date,nights,operator,ship,cruise_id,fname,lname,email,mobile_no,best_time_to_call,cabins_rating1,cabins_rating2,cabins_type,preferred_departure_airport,comments,hear_about_us,status} = req.body;
        const enquiryObj = new enquirySchema({
            cruise_package : cruise_package,
            date : date,
            nights : nights,
            operator : operator,
            ship : ship,
            cruise_id: cruise_id,
            fname : fname,
            lname: lname,
            email : email,
            mobile_no: mobile_no,
            best_time_to_call:best_time_to_call,
            cabins_rating1:cabins_rating1,
            cabins_rating2:cabins_rating2,
            cabins_type:cabins_type,
            preferred_departure_airport:preferred_departure_airport,
            comments:comments,
            hear_about_us:hear_about_us,
            status:status
        })

        const enquiryResult = await enquiryObj.save();
        if(enquiryResult){
            return res.status(200).json({ message: "Successfully Insert Enquiry Data", success: true, data: enquiryResult,  status : 200 });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}


enquiry.enquiryGet = async (req,res)=>{
    try {
        const enquiryResult = await enquirySchema.find();
        if(enquiryResult){
            return res.status(200).json({ message: "Successfully fetch enquiry Data", success: true, data: enquiryResult });
        }else{
            res.status(400).json({ message: "Error in database", data: "" , success : false , status : 400 });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", data: "" , success : false , status : 500 });
    }
}
module.exports = enquiry;