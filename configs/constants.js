module.exports = {
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
    EMAIL_REGEX: /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$/,

    AUTHORIZATION: 'Authorization',
};