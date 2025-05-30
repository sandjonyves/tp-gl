
const createUser = require("./createUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const refreshExpiredToken  = require("./refreshExpiretedToken ");
const updateUserName = require("./updateUser").updateUserName;
const updateUserRole = require("./updateUser").updateUserRole;

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    refreshExpiredToken,  
    updateUserName,
    updateUserRole
};