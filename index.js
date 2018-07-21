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
            res.status(200).send("<style>
                                    body {
                                        margin: 0;
                                        padding: 0;
                                        font-family: 'PingFang HK', 'Hiragino Sans GB', '冬青黑体', 'Microsoft Yahei', '微软雅黑', 'STXihei', '华文细黑', 'SimHei', '黑体', 'Hei Ti', 'Helvetica neue', Helvetica, sans-serif;
                                    }
                                    .form-page {
                                        position: fixed;
                                        width: 100vw;
                                        height: 100vh;
                                        background: #93c406;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                    .form-modal {
                                        padding: 20px;
                                        width: 80%;
                                        height: 80%;
                                        background: #93c406;
                                        display:flex;
                                        justify-content:center;
                                        align-items:center;
                                        flex-direction:column;
                                    }
                                    .form-modal-text {
                                        color:#fff;
                                        margin-bottom:50px;
                                    }
                                    @media(max-width: 1350px){
                                        .form-modal-text {
                                            text-align: center;
                                        }
                                        span {
                                            display:block;
                                        }
                                    }
                                    @media(max-width: 700px){
                                        .form-modal-text {
                                            font-size: 18px;
                                        }
                                        img {
                                            width: 150px;
                                        }
                                    }
                                    @media(max-width: 390px){
                                        .form-modal-text {
                                            font-size: 16px;
                                        }
                                        img {
                                            width: 125px;
                                        }
                                    }
                                  </style>".
                            "<div class='form-page'>
                                    <div class='form-modal'>
                                        <h1 class='form-modal-text'>您的预约申请已提交成功。
                                            <span>我们的专业老师会尽快与您取得联系。</span>
                                                谢谢！</h1>
                                        <img src='../images/header/logo-young-talent-white.png' alt='young talent logo' width='200px'>
                                    </div>
                                </div>".
                                "<script>
                                    function changeLocation(){
                                        setTimeout(function(){
                                            window.location.replace('http://youngtalent.cn/');
                                        }, 5000);   
                                    }
                                    changeLocation();
                                </script>";)
        })
        .catch((e) => {
            console.log('successfully sent')
            res.status(500).json({
                success: false,
                error: String(e)
            })
        
//             (res.status(500)) ? window.location.replace('http://youngtalent.cn/form/failed.html') : console.log('something wrong');
        });
});

const PORT = process.env.PORT  || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`<<<<Server is running on port: ${PORT}`)
})
