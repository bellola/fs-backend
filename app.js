const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res) => 


console.log(req.body))
// res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))