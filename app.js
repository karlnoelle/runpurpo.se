const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('run app is here'))

app.listen(3000, () => console.log('runpurpose listening on port 3000'))