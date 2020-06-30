const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const cors = require('cors')

const app = express()

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.use(cors());

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.use(function(request, response) {
    console.log("redirecting " + !request.secure)
    if(!request.secure) response.redirect("https://" + request.headers.host + request.url);
});

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)
