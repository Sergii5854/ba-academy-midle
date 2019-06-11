const express = require('express');
const path = require('path')




const app = express();
const router = require('./api/router');




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/api/v1', router);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
});



// error handling
app.use(function (req, res, next) {
    const err = new Error(`Not Found ${req.path}`);
    err.status = 404;
    next(err)
});
app.use(function (error, req, res, next) {
    if (error) {
        console.log(error);
        return res.status(400).json({error})
    }
    next(error)
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
});

module.exports = app;
