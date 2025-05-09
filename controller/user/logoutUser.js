const User = require("../../models/user.model");


const logoutUser = async (req, res) => {
    const token = req.cookies.refreshToken;
    const user = await User.findOne({ where: { refreshToken: token } });
  
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Déconnecté avec succès' });
  };

  module.exports = logoutUser;