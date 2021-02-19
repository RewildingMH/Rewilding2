const User = require("../models/User")
const nodemailer = require('nodemailer')
const emailController = {
    recoverPasword: async (req, res) => {
        console.log("email enviado")
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "lauriane12@ethereal.email", // generated ethereal user
              pass: "6DtdvEWsMzm2r95KjN", // generated ethereal password
            },
        })
        const info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "lucas_e_93@hotmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          });
        // try{
        //     const { email } = req.params
        //     const response = await User.findOne({username: email})

        //     res.json({ success: true, response })
        // }catch(error){
        //     res.json({ success: false, error })
        //   }
        
    }
}


module.exports = emailController