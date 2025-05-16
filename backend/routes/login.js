const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const userFilePath = path.join(__dirname, "../data/user.json");

router.post("/", (req, res) => {
    const { username, password } = req.body;
    const jsonData = fs.readFileSync(userFilePath, 'utf-8');
    const users = jsonData ? JSON.parse(jsonData) : [];

    const foundUser = users.find(user => user.email === username);

    if (!foundUser) {
        return res.status(404).json({ message: "Incorrected Username" });
    }

    if (foundUser.password !== password) {
        return res.status(401).json({ message: "Incorrected Password" });
    }

    res.status(200).json({ message: "Login successfully" });
});


module.exports = router;
