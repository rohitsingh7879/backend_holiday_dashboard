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

    const skip = (pageNumber - 1) * limitNumber;

    const totalSubscribers = await subscribeWithMail.countDocuments();

    const subscribeResult = await subscribeWithMail
      .find()
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      message: "Successfully fetched subscriber data.",
      success: true,
      data: subscribeResult,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: totalSubscribers,
        totalPages: Math.ceil(totalSubscribers / limitNumber),
      },
    });
  } catch (error) {
    console.error("--- error --", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

subscribe_obj.subscribeGet = async (req, res) => {
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

    const skip = (pageNumber - 1) * limitNumber;

    const totalSubscribers = await subscriberSchema.countDocuments();

    const subscribeResult = await subscriberSchema
      .find()
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      message: "Successfully fetched subscriber data.",
      success: true,
      data: subscribeResult,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total: totalSubscribers,
        totalPages: Math.ceil(totalSubscribers / limitNumber),
      },
    });
  } catch (error) {
    console.error("--- error --", error);
    return res.status(500).json({
      message: "Internal Server Error",
      data: "",
      success: false,
      status: 500,
    });
  }
};

module.exports = subscribe_obj;
