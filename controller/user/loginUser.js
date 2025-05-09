const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
const ms = require("ms");
require("dotenv").config();

const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ where: { name } });
        
        if (!user) {
            return res.status(404).json({ message: "Authentication failed: User not found" });
        }
        
        if (!user.password) {
            return res.status(401).json({ message: "Authentication failed: Invalid user data" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed: Password is not valid" });
        }
        
        const { accessToken, refreshToken } = await user.generateTokens();
        user.refreshToken = refreshToken;
        await user.save();

        // Correction ici: 'acessToken' -> 'accessToken'
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: ms(process.env.ACCESS_TOKEN_EXPIRES),
        });

        // Et ici aussi pour le refreshToken
        res.cookie("refreshToken", refreshToken, {  // Correction: 'accessToken' -> 'refreshToken'
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: ms(process.env.REFRESH_TOKEN_EXPIRES),
        });

        return res.status(200).json({ 
            message: "Login successful",
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = loginUser;