const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

const addSubscriber = async (req, res) => {
  try {
    const { subscriberFirstName, subscriberSurName, subscriberEmail } =
      req.body;
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: subscriberEmail,
        status: "subscribed", // use "pending" for double opt-in
        merge_fields: {
          FNAME: subscriberFirstName,
          LNAME: subscriberSurName,
        },
      }
    );
    if (response?.id) {
      return res.status(200).json({
        message: "Successfully added subscriber.",
        success: true,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error in mailchimp.",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    // console.error("Mailchimp error:", error.response?.body || error.message || error);
    return res.status(500).json({
      message: "Internal Server Error.",
      data: "",
      error: error?.response?.body?.title || error?.message || "Unknown error",
      success: false,
      status: 500,
    });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber <= 0 || limitNumber <= 0) {
      return res.status(400).json({
        message: "Page and limit must be positive integers.",
        success: false,
        data: "",
      });
    }

    const offset = (pageNumber - 1) * limitNumber;

    const response = await mailchimp.lists.getListMembersInfo(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        count: limitNumber,
        offset: offset,
      }
    );

    const totalSubscribers = response.total_items;
    const members = response.members;
    
    const membersData = members.map((member) => {
      return {
        id: member?.id,
        email: member?.email_address,
        first_name: member?.merge_fields?.FNAME,
        last_name: member?.merge_fields?.LNAME,
        status: member?.status,
        created_at: member?.timestamp_opt,
        updated_at: member?.last_changed,
      };
    });

    return res.status(200).json({
      message: "Successfully fetched subscriber data from Mailchimp.",
      success: true,
      data: membersData,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: totalSubscribers,
        totalPages: Math.ceil(totalSubscribers / limitNumber),
      },
    });
  } catch (error) {
    console.error("--- error ---", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

module.exports = { addSubscriber, getAllMembers };
