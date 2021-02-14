const Joi = require('joi')

const validator = {
    validNewAccount: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().trim().required().min(4).max(15),
            lastName: Joi.string().trim().required().min(2).max(20),
            username: Joi.string().trim().required().email({ tlds: {allow: false} }),
            profilePicture: Joi.string().trim().required(),
            password: Joi.string().trim().required().min(6).max(8),
            rol: Joi.string().trim(),
            country: Joi.string().required()
        }) 

        const validation = schema.validate(req.body, {abortEarly: false})

        if (!validation.error) {
            next()
        } else {
            res.json({success: false, errores: validation.error.details})
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user.rol === 'admin') {
            next()
        } else {
            res.json({success: false, mensaje: 'Access Denied'})
        }
    }
}

module.exports = validator