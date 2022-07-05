const jwt = require('jsonwebtoken');
const { CustomError } = require("../errors");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../configs/configs")
const { tokenTypeEnum } = require("../enums");

module.exports = {
     generateAuthToken: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        }
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {

        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS ) {
                secret = ACCESS_TOKEN_SECRET
            }

            if (tokenType === tokenTypeEnum.REFRESH) {
                secret = REFRESH_TOKEN_SECRET
            }

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },
};

