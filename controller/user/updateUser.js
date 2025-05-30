const User = require("../..//models/user.model");

const updateUserName = async (req, res) => {
    try {
        console.log('testetstetetette')
        const { id } = req.params;
        const { name,  } = req.body;

        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if(!role) {
            return res.status(400).json({ message: "Role is required" });
        }
        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(role !== "admin" && role !== "user") {
            return res.status(400).json({ message: "Invalid role" });
        }

        user.role = role || user.role;
        
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateUserName,
    updateUserRole
}