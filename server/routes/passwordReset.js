const router = require("express").Router();
const { User } = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		// let token = await Token.findOne({ userId: user._id });
		// if (!token) {
		// 	token = await new Token({
		// 		userId: user._id,
		// 		token: crypto.randomBytes(32).toString("hex"),
		// 	}).save();
		// }
		await User.findByIdAndRemove(user._id);
		const newUser = await new User({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			verified: user.verified,
			verificationToken: crypto.randomBytes(32).toString("hex"),
			verificationTokenExpires: Date.now()
		}).save();
		console.log("newUser: ", newUser);
		const url = `${process.env.BASE_URL}password-reset/${newUser._id}/${newUser.verificationToken}`;
		sendEmail(newUser.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log("error: ", error);
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ verificationToken: req.params.token });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });
			if (!user.verified) user.verified = true;

			const salt = await bcrypt.genSalt(Number(process.env.SALT));
			const hashPassword = await bcrypt.hash(req.body.password, salt);

			user.password = hashPassword;
			await user.save();
			await User.updateMany({ _id: user._id, verified: true, $unset: { verificationToken: 1 } });
			await User.updateOne({ _id: user._id, $unset: { verificationTokenExpires: 1 } });

			res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
