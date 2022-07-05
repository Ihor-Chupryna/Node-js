const { CustomError } = require("../errors");
const { checkToken } = require("../services/token.service");
const OAuth = require('../dataBase/OAuth');
const { userService } = require("../services");
const { authValidator } = require("../validators");
const { tokenTypeEnum } = require("../enums");
const { constants } = require("../configs");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            if (!access_token) {
                throw new CustomError('No token', 404);
            }

            checkToken(access_token);

            const tokenInfo = await OAuth.findOne({ access_token: access_token }).populate('userId');

            if (!tokenInfo) {
                throw new CustomError('Token not valid', 401);
            }

            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }

    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                throw new CustomError('No token', 401);
            }

            checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({ refresh_token: refresh_token });

            if (!tokenInfo) {
                throw new CustomError('Token not valid', 401);
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }

    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await userService.findOneUser({ email: email });

            if (!userByEmail) {
                throw new CustomError('Wrong email or password');
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginBodyValid: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.login.validate(req.body);

            if (error) {
                throw new CustomError('Wrong email or password');
            }

            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};