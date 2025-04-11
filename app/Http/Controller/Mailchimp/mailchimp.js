const mailchimp = require('@mailchimp/mailchimp_marketing');
// Configure Mailchimp
mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
  });
  
  // Add contact to Mailchimp list
 const addSubscriber=async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
      
      const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      });
  
      res.json({ success: true, data: response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.response?.body || error.message });
    }
  };
  