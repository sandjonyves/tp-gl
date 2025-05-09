const User = require("../..//models/user.model");
const jwt = require("jsonwebtoken");

const refreshExpiretedToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401).json({ message: 'Token non fourni' }); 
  
    const user = await User.findOne({ where: { refreshToken: token } });
    if (!user) return res.sendStatus(403).json({ message: 'Utilisateur non trouvé' }); 
  
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.id !== user.id) return res.sendStatus(403).json({ message: 'Token invalide' });
  
      const { accessToken } = user.generateTokens();
      res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'strict' });
      res.json({ message: 'Token rafraîchi' });
    });
  };
  
  module.exports = refreshExpiretedToken ;