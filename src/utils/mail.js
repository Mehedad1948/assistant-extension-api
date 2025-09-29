const { promisify } = require('es6-promisify')
const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
})

exports.sendVerification = async (options) => {
    const mailOptions = {
        from: 'Link saver Support <email@domain.com>',
        to: options.email,
        subject: "Welcome to link saver ",
        html: `<p>Welcome, Verify your email <a href="${process.env.UI_URL}/verify/${options.token}"> Click Here </a> </p>`
    }

    const sendmail = promisify(transport.sendMail.bind(transport))

    return sendmail(mailOptions)
}