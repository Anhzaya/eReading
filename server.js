const express = require('express');
const Pool = require('pg').Pool;
const app = express();
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
})

app.get('/books', function (req, res) {
    pool.query('SELECT * FROM books', (error, result) => {
        if (error)
            throw(error)
        res.status(200).json(result.rows)
    })
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
})