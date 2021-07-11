const port = 3006
const express = require('express')
app = express()
const cors = require('cors');

const config = require('./knexfile')
const knex = require('knex')(config)

const { Model } = require('objection');
Model.knex(knex )

app.knex = knex

require('./config/routes.js')


const bodyParser = require('body-parser')
const consgin = require('consign')
app.use(bodyParser.json())
app.use(cors())


consgin()
    .include('./api/')
    .then('./config/routes.js')
    .into(app)

app.use('*', (req, res) => {
    res
    .status(404)
    .json( {status: false, message: 'Endpoint Not Found'} );
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})