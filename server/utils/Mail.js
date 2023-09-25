const Mailer = require("nodemailer");

// Initialize the Authentication of Gmail Options

const sendMail =(options)=>{
    const transportar = Mailer.createTransport({
        service: "gmail",
        host:'sandbox.smtp.mailtrap.io',
        port:2525,
        auth: {
          user: "hirankvlr@gmail.com", // Your Gmail ID
          pass: "Sindhuamma",         // Your Gmail Password
        },
      });
      
      // Deifne mailing options like Sender Email and Receiver.
      const mailOptions = {
        from: "hirankvlr@gmail.com", // Sender ID
        to: "hiranrajofficial@gmail.com", // Reciever ID
        subject:options.subject, // Mail Subject
        text: options.message, // Description
      };
      
      // Send an Email
      transportar.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        console.log(info);
      });
}


module.exports = sendMail