const {
  subscriberSchema,
  subscribeWithMail,
} = require("../../../Models/subscribeModel");
const subscribe_obj = {};

subscribe_obj.subscribeSave = async (req, res) => {
  try {
    const { subscriberFirstName, subscriberSurName, subscriberEmail } =
      req.body;

    const existingSubscriber = await subscriberSchema.findOne({
      subscriberEmail: subscriberEmail,
    });
    const existingSubscriberWithEmail = await subscribeWithMail.findOne({
      subscriberEmail: subscriberEmail,
    });

    if (existingSubscriber || existingSubscriberWithEmail) {
      return res.status(400).json({
        message: "This email is already subscribed.",
        success: false,
        data: "",
        status: 400,
      });
    }

    const subscribeObj = new subscriberSchema({
      subscriberFirstName: subscriberFirstName,
      subscriberSurName: subscriberSurName,
      subscriberEmail: subscriberEmail,
    });

    const subscribeResult = await subscribeObj.save();

    if (subscribeResult) {
      return res.status(200).json({
        message: "Successfully added subscriber.",
        success: true,
        data: subscribeResult,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error in database.",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.log("--- error--", error);
    res.status(500).json({
      message: "Internal Server Error.",
      data: "",
      success: false,
      status: 500,
    });
  }
};


subscribe_obj.subscribeWithEmailSave = async (req, res) => {
  try {
    const { subscriberEmail } = req.body;

    const existingSubscriber = await subscriberSchema.findOne({
      subscriberEmail: subscriberEmail,
    });
    const existingSubscriberWithEmail = await subscribeWithMail.findOne({
      subscriberEmail: subscriberEmail,
    });

    if (existingSubscriber || existingSubscriberWithEmail) {
      return res.status(400).json({
        message: "This email is already subscribed.",
        success: false,
        data: "",
        status: 400,
      });
    }

    const subscribeObj = new subscribeWithMail({
      subscriberEmail: subscriberEmail,
    });

    const subscribeResult = await subscribeObj.save();

    if (subscribeResult) {
      return res.status(200).json({
        message: "Successfully added subscriber.",
        success: true,
        data: subscribeResult,
        status: 200,
      });
    } else {
      return res.status(400).json({
        message: "Error in database.",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.log("--- error--", error);
    res.status(500).json({
      message: "Internal Server Error.",
      data: "",
      success: false,
      status: 500,
    });
  }
};

subscribe_obj.subscribeWithEmailGet = async (req, res) => {
  try {
    const subscribeResult = await subscribeWithMail.find();
    if (subscribeResult) {
      return res.status(200).json({
        message: "Successfully fetch subscriber Data",
        success: true,
        data: subscribeResult,
      });
    } else {
      res.status(400).json({
        message: "Error in database",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

subscribe_obj.subscribeGet = async (req, res) => {
  try {
    const subscribeResult = await subscriberSchema.find();
    if (subscribeResult) {
      return res.status(200).json({
        message: "Successfully fetch subscriber Data",
        success: true,
        data: subscribeResult,
      });
    } else {
      res.status(400).json({
        message: "Error in database",
        data: "",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

module.exports = subscribe_obj;
