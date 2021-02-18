const User = require('../models/User')

const profileController = {
    getUserId: async (req, res) => {
        try {
            const id = req.params.id
            const data = await User.findById( {_id : id})
            res.json({success: true, response:data})
        } catch (error){
            res.json({success: false , response: error})
        }
    }
}

module.exports = profileController