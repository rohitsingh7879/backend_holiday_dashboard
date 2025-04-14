// const crypto = require("crypto");
// const mailchimp = require("@mailchimp/mailchimp_marketing");

// mailchimp.setConfig({
//   apiKey: process.env.MAILCHIMP_API_KEY,
//   server: process.env.MAILCHIMP_SERVER,
// });

// function getSubscriberHash(email) {
//   return crypto.createHash("md5").update(email.toLowerCase()).digest("hex");
// }

// async function addOrUpdateSubscriber(email, firstName, lastName) {
//   const subscriberHash = getSubscriberHash(email);

//   try {
//     const response = await mailchimp.lists.setListMember(
//       process.env.MAILCHIMP_AUDIENCE_ID,
//       subscriberHash,
//       {
//         email_address: email,
//         status_if_new: "subscribed", // Only applies if new
//         status: "subscribed",        // Forces re-subscribe if needed
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName,
//         },
//       }
//     );

//     // console.log("✅ Subscriber added or updated:", response);
//     return { success: true, data: response };
//   } catch (error) {
//     // console.error("❌ Error in Mailchimp re-subscribe:", error.response?.body || error.message);
//     return {
//       success: false,
//       error: error.response?.body || error.message || "Unknown error",
//     };
//   }
// }

// module.exports = addOrUpdateSubscriber;

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

async function addSubscriber(email, firstName, lastName) {
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed", // use "pending" for double opt-in
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      }
    );
    // console.log("Mailchimp: User added successfully:", response);
    return { success: true, data: response };
  } catch (error) {
    // console.error("Mailchimp error:", error.response?.body || error.message || error);
    return {
      success: false,
      error: error.response?.body || error.message || "Unknown error",
    };
  }
}

module.exports = addSubscriber;

