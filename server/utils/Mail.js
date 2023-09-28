const htmlContent = require("../utils/template");
const { createTransport } = require("nodemailer");

process.on("message", async ({ meeting }) => {
  const { host, participants, slug } = meeting;

  const meetingHost = host?.map((h) => {
    return h.email;
  });

  const meetingHostName = host?.map((hn) => {
    return hn.name;
  });
  const meetingParticipants = participants?.map((p) => {
    return p.email;
  });

  const joinMail = meetingHost.concat(meetingParticipants);

  const meetingUrl = `http://localhost:3000/meeting/${slug}`;

  const message = `Your are invited to join the meeting. The meeting is going to host by Mr. ${meetingHostName}. You can join the meeting through ${meetingUrl}.`;

  const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "hirankvlr@gmail.com",
      pass: "JEWmy5FqKcYd0NzD",
    },
  });

  const mailOptions = {
    from: "hirankvlr@gmail.com",
    to: joinMail,
    subject: `Meeting Invitation`,
    html: htmlContent(message),
  };

  const sendMail = await transporter.sendMail(mailOptions);

  console.log(sendMail);
  process.exit(1);
});
