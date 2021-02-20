const User = require("../models/User")
const nodemailer = require('nodemailer')
const emailController = {
    recoverPasword: async (req, res) => {
        try{
            const {email } = req.body.email
            const response = await User.findOne({username: email})
       
            const transporter = nodemailer.createTransport({
               service: "Gmail",
                auth: {
                  user: "rewilding.squad@gmail.com", // generated ethereal user
                  pass: "rewilding2021", // generated ethereal password
                },
            })
            if(response !== null){
                const info = await transporter.sendMail({
                    from: "REWILDING MINDHUB", // sender address
                    to: response.username, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                  });
                 res.json({
                     success: true,
                    info: info.messageId,
                    response
                 })
            }else{
                res.json({success: false, message: "Your email is not registered"})
            }
            
        }catch(error){
            res.json({success: false, error})
        }
      
        
    }
}


module.exports = emailController