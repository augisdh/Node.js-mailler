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

    const {name, number, msg, mailAddr} = req.body;

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
        to: `platform@youngtalent.cn`,
        subject: `Email received from youngtalent.cn`,
        html: `
                <p>Name: ${name}</p>
                <p>Number: ${number}</p>
                <p>Message: ${msg}</p>
                <p>Email address: ${mailAddr}</p>
              `
    };

    console.log('sending email')

    transporter.sendMail(HelperOptions)
        .then(() => {
            console.log('successfully sent')
            if(res.status(200)){
                window.location.replace('http://youngtalent.cn/form/success.html');
            }
        })
        .catch((e) => {
            console.log('successfully sent')
            if(res.status(500)){
                window.location.replace('http://youngtalent.cn/form/failed.html');
            }
        });
});

const PORT = process.env.PORT  || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`<<<<Server is running on port: ${PORT}`)
})
