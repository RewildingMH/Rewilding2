const User = require("../models/User")
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const emailController = {
    recoverPasword: async (req, res) => {
        try{
            const {email } = req.body.email
            const response = await User.findOne({username: email})
       
            const transporter = nodemailer.createTransport(smtpTransport({
               service: "gmail",
                auth: {
                  user: "rewinding.squad@gmail.com", // generated ethereal user
                  pass: "rewilding2021", // generated ethereal password
                },
            }))
            if(response !== null){
                const data = transporter.sendMail({
                    from: "REWILDING MINDHUB", // sender address
                    to: response.username, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "NO QUIERO QUE LLEGUE EL HELLO WORD", // plain text body
                    html: "<img src='https://d1hoh05jeo8jse.cloudfront.net/media/google/gmail-icon.jpg'><strong>test</strong>El nombre es ${nombre} <br />con el correo ${correo} y El mensaje es ${mensaje}, ah y el tema es ${tema}`, // html body"
                  })
                 res.json({
                     success: true,
                    info: data.messageId,
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