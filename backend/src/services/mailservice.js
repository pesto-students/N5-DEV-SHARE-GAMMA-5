module.exports = {
    sendEmail:function(from,to,subject,text){
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'devsharegamma@gmail.com',
            pass: 'devsharegamma123'
            }
        });

        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text
        };
            
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
}
