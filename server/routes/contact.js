const router = require("express").Router();
const sendEmail = require("../utils/sendEmail");
const validateContactForm = require("../models/contactValidation");

router.post("/", async (req, res) => {
    try {
        const { error } = validateContactForm(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const email = "support@liquidhiring.com";
        const subject = String("The contact form has been submitted by " + req.body.fullName);
        const message = String("The sender's email for the following message is: " + req.body.email + ".\n\nThe message is as follows:\n\n" + req.body.message);

        await sendEmail(email, subject, message);
        res.status(200).send({ message: "We have received your message. We will get back to you soon!" });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
