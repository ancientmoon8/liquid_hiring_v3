const router = require("express").Router();
const { User, validate } = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });

		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({
			...req.body, password: hashPassword, verificationToken: crypto.randomBytes(32).toString("hex"),
			verificationTokenExpires: Date.now()
		}).save();

		// const token = await new Token({
		// 	userId: user._id,
		// 	token: crypto.randomBytes(32).toString("hex"),
		// }).save();

		// Update the user with the token and created at time
		// user = await User.findByIdAndUpdate(user._id, {
		// 	,
		// });
		// });


		const url = `${process.env.BASE_URL}users/${user.id}/verify/${user.verificationToken}`;
		try {
			await sendEmail(user.email, "Verify your email", url);
		}
		catch (error) {
			console.log(error);
			res.status(500).send({ message: error.response.body.errors[0].message });
		}
		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });

	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = User.findOne({ verificationToken: req.params.token });
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateMany({ _id: user._id, verified: true, $unset: { verificationToken: 1 } });
		await User.updateOne({ _id: user._id, $unset: { verificationTokenExpires: 1 } });

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
