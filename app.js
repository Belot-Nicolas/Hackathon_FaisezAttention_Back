const express = require('express');
const app = express();
const connection = require('./db-config');
const router = require('./routes/index.routes');

const port = process.env.PORT;

connection.connect((err) => {
    if (err) {
        console.error('error connecting' + err.stack);
    } else {
        console.log('connect as id' + connection.threadId);
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);

app.get("/", (req,res) => {
    res.send("Welcome");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});



module.exports = app;