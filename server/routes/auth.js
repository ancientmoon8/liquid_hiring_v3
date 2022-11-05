const router = require("express").Router();
const { User } = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			user = await User.findOneAndUpdate({ _id: user._id }, { $set: { verificationToken: crypto.randomBytes(32).toString("hex"), verificationTokenExpires: Date.now() } });

			const url = `${process.env.BASE_URL}users/${user._id}/verify/${user.verificationToken}`;
			await sendEmail(user.email, "Verify Email", url);

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}
		res.status(200).send({
			user: {
				_id: user._id.toString(),
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			message: "logged in successfully",
		});

	} catch (error) {
		console.log("error: ", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
