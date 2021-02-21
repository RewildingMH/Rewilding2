const User = require('../models/User')
const Petition = require('../models/Petition')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const path = require('path')


const userController = {
    signUp: async (req, res) => {
        console.log(req.body, req.files)
        try{
            
        const errores = []
        const { name, lastName, username, password} = req.body
        const file = req.files.file
        const userExists = await User.findOne({ username: username })
        if (userExists) {
            let error = [{ path: ['usernameExist'] }]
            res.json({ success: false, errores: error })
        }
        file.mv(path.join(__dirname,`../client/build/assets/profilePictures/${file.md5}.jpg`), error => {
            if (error) {
                return res.json({ response: error })
            }
        }
        )
        if (errores.length === 0) {
            const passwordHasheado = bcryptjs.hashSync(password, 10)
            const profilePictureUbicacion = `/assets/profilePictures/${file.md5}.jpg`
            var newUser = new User({
                name, lastName, username, profilePicture: profilePictureUbicacion, password: passwordHasheado, rol: "personal account"
            })
            var newUserSaved = await newUser.save()
            var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
        }
        return res.json({
            success: errores.length === 0 ? true : false,
            response: {
                token,
                name: newUserSaved.name,
                profilePicture: newUserSaved.profilePicture,
                username: newUserSaved.username,
                rol: newUserSaved.rol,
                userId: newUserSaved._id
            }
        })
        }catch(error){
            res.json({success: false, error})
        }

            const errores = []
            const { name, lastName, username, password } = req.body
            const file = req.files.file
            const userExists = await User.findOne({ username: username })
            if (userExists) {
                let error = [{ path: ['usernameExist'] }]
                res.json({ success: false, errores: error })
            }
            file.mv(path.join(__dirname, `../frontend/public/assets/profilePictures/${file.md5}.jpg`), error => {
                if (error) {
                    return res.json({ response: error })
                }
            }
            )
            if (errores.length === 0) {
                const passwordHasheado = bcryptjs.hashSync(password, 10)
                const profilePictureUbicacion = `/assets/profilePictures/${file.md5}.jpg`
                var newUser = new User({
                    name, lastName, username, profilePicture: profilePictureUbicacion, password: passwordHasheado, rol: "personal account"
                })
                var newUserSaved = await newUser.save()
                var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
            }
            return res.json({
                success: errores.length === 0 ? true : false,
                response: {
                    token,
                    name: newUserSaved.name,
                    profilePicture: newUserSaved.profilePicture,
                    username: newUserSaved.username,
                    rol: newUserSaved.rol,
                    userId: newUserSaved._id
                }
            })
        } catch (error) {
            res.json({ success: false, error })
        }

    },
    signGoogle: async (req, res) => {
        try {
            const { givenName, familyName, email, googleId, imageUrl } = req.body
            const userExists = await User.findOne({ username: email })
            if (userExists) {
                var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
                return res.json({
                    success: true, response: {
                        success: true,
                        token,
                        name: userExists.name,
                        profilePicture: userExists.profilePicture,
                        username: userExists.username,
                        rol: userExists.rol,
                        userId: userExists._id
                    }
                })
            } else {
                var newUser = new User({
                    name: givenName, lastName: familyName, username: email, profilePicture: imageUrl, googleId, rol: "personal account"
                })
                var newUserSaved = await newUser.save()
                var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
                return res.json({
                    success: true, response: {
                        success: true,
                        token,
                        name: newUserSaved.name,
                        profilePicture: newUserSaved.profilePicture,
                        username: newUserSaved.username,
                        rol: newUserSaved.rol,
                        userId: newUserSaved._id
                    }
                })
            }
        } catch (error) {
            res.json({ success: false, error })
        }

    },
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body
            const userExists = await User.findOne({ username: username })
            if (!userExists) {
                return res.json({ success: false, mensaje: 'Incorrect username and / or password.' })
            }
            const passwordMatches = bcryptjs.compareSync(password, userExists.password)
            if (!passwordMatches) {
                return res.json({ success: false, mensaje: 'Incorrect username and / or password.' })
            }
            var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
            return res.json(
                {
                    success: true, response: {
                        token,
                        name: userExists.name,
                        profilePicture: userExists.profilePicture,
                        username: userExists.username,
                        rol: userExists.rol,
                        userId: userExists._id
                    }
                })
        } catch (error) {
            res.json({ success: false, error })
        }
    },
    logFromLS: (req, res) => {
        try {
            res.json({
                success: true, response: {
                    token: req.body.token,
                    name: req.user.name,
                    profilePicture: req.user.profilePicture,
                    username: req.user.username,
                    rol: req.user.rol,
                    userId: req.user._id

                }
            })
        } catch (error) {
            res.json({ success: false, error })
        }
    },
    likeReason: async (req, res) => {

        try {
            const response = await Petition.findOneAndUpdate(
                { _id: req.body.petId, 'reasons._id': req.body.id },
                {
                    $addToSet:
                    {
                        'reasons.$.likes': {
                            id: req.user._id
                        }
                    }

                },
                { new: true }
            );

            res.json({
                success: true,
                response
            })
        } catch (error) {
            res.json({
                success: false,
                response: error,
            })
        }
    },

    dislikeReason: async (req, res) => {
        try {
            const { petId, id } = req.params
            const response = await Petition.findOneAndUpdate(
                { _id: petId, 'reasons._id': id },
                {
                    $pull:
                    {
                        'reasons.$.likes': {
                            id: req.user._id
                        }
                    }

                },
                { new: true });

            res.json({
                success: true,
                response
            })
        } catch (error) {

            res.json({
                success: true,
                error
            })
        }
    },
    deleteReason: async (req, res) => {
        try {
            const { petId, reasonId } = req.params
            const response = await Petition.findOneAndUpdate(
                { _id: petId },
                {
                    $pull: {
                        reasons: {
                            _id: reasonId,
                        },
                    },
                },
                { new: true }
            )
            res.json({
                success: true,
                response
            })
        } catch (error) {
            res.json({
                success: false,
                error
            })

        }
    },
    modifyReason: async (req, res) => {
        try {
            const response = await Petition.findOneAndUpdate(
                {
                    _id: req.body.petId,
                    "reasons._id": req.body.id,
                },
                {
                    $set: {
                        "reasons.$.reason": req.body.modification,
                    },
                },
                { new: true }
            );

            res.json({
                success: true,
                response
            });
        } catch (error) {

            res.json({
                succes: true,
                error
            })
        }
    },


}




module.exports = userController