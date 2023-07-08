const express = require("express");
const res = require("express/lib/response");
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'node_mysql'
}

const mysql = require('mysql2')

app.get('/:name', (req, resp) => {

    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values ('${req.params.name}')`
    connection.query(sql)
    const sqlSelect = `SELECT * FROM people`
    connection.query(sqlSelect, (err, results, fields) => {
        let people = results

        let response = `<h1>Full cycle rocks!</h1>
                            <ul>`

        people.forEach(element => {
            response += `<li>${element.name}</li>`
        });

        response += '</ul>'

        resp.send(response)
    })
    connection.end
})

app.listen(port, () => {
    console.log('Servidor iniciado na porta: ' + port)
})