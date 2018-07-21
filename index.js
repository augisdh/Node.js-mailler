const app = require('express')();
const cors = require('cors');
const NodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const http = require('http');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => res.send('hello wolrd'));

app.post('/email', (req, res) => {

    const {emailTo, text} = req.body;

    let email = process.env.email;
    let pass = process.env.password;

    const transporter = NodeMailer.createTransport({
        service: "Gmail",
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: pass
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
            console.log('successfully sent')
            res.status(500).json({
                success: false,
                error: String(e)
            })
        });




});

const PORT = process.env.PORT  || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`<<<<Server is running on port: ${PORT}`)
})
