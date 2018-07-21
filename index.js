const app = require('express')();
const cors = require('cors');
const NodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const {mailer} = require('./config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello wolrd'));

app.post('/email', (req, res) => {

    const {emailTo, text} = req.body;

    const transporter = NodeMailer.createTransport({
        service: "Gmail",
        secure: false,
        port: 25,
        auth: {
            user: mailer.user,
            pass: mailer.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const HelperOptions = {
        from: `"YoungTalent email" <`,
        to: emailTo,
        subject: `We received email`,
        html: `<p>${text}</p>`
    };

    console.log('sending email')

    transporter.sendMail(HelperOptions)
        .then(() => {
            console.log('successfully sent')
            res.status(200).json({
                success: true,
                data: 'Email sent'
            })
        })
        .catch((e) => {
            console.log('erroriesh sent')
            res.status(500).json({
                success: false,
                error: String(e)
            })
        });




});

app.listen(3000, () => console.log('Example app listening on port 3000!'));