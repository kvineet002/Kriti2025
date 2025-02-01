const User = require("../models/user");

const createUser = async (req, res) => {    
    const { name, email, avatar } = req.body;
    try {
        const user = new User({
            name: name,
            email: email,
            avatar: avatar
        });
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user!");
    }
}
const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email:
            email });
        if (!user) {
            res.status(404).send("User not found!");
        }
        res.status(200).send(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error getting user!");
    }
}
module.exports = {
    createUser,
    getUser
};
