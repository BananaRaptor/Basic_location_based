const express = require('express')
var fs = require('fs');
var https = require('https');
const app = express()
const morgan = require('morgan')
const path = require("path")
var https = require('https');

// Not included in repo generate some using certbot
var privateKey = fs.readFileSync('localhost+2-key.pem');
var certificate = fs.readFileSync('localhost+2.pem');

var options = {
    cert: certificate,
    key: privateKey
};


app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "/")))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.get('/', (req, res) => {
    res.render('index')
})

var server = https.createServer(options, app);

app.listen(3000, () => {
    console.log('listening on port 3000')
})

// HTTPS endpoint to allow cellphone sensor on IOS
server.listen(8001, function () {
    console.log("server running at https://IP_ADDRESS:8001/")
});