const mongoose = require("mongoose");

const staticContentSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true,
    enum: ['AboutUs','ContactUs','PrivacyAndPolicy','TermsAndConditions','CareerOportunity'], 
  },

  content: {
    type: String,
    required: function(){
      return this.type==="AboutUs" || this.type==='ContactUs'  || this.type==='TermsAndConditions';
    }
  },

  heading:{
    type: String,
    required: function(){
      return this.type==="CareerOportunity"
    }
  },

  description:{
    type: String,
    required: function(){
      return this.type==="CareerOportunity"
    }
  }

});

const staticContentModel= mongoose.model('staticContent', staticContentSchema);

module.exports = { staticContentModel };
