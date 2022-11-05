const router = require("express").Router();
const { User } = require("../models/user");

// Create a post route to accept the user's id and update the additonal information in the database
router.post("/update", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            additionalInfo: req.body.data.additionalInfo,
        });

        if (!user) return res.status(404).send({ message: "User not found" });
        res.status(200).send({
            user: {
                _id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                additionalInfo: user.additionalInfo,
            },
            message: "User updated successfully",
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;