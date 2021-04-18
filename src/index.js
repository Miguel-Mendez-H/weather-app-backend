const express = require('express')

const { simulatedKey } = require("./key")
const weather = require("./weather.json")

const PORT = process.env.PORT || 3001
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    next();
})

app.get('/weather', (req, res) => {
    const auth = req.headers.authorization
    
    res.status(200)
    if (auth === simulatedKey) {
        return res.json(weather)
    }
})

app.get("/*", (req, res) => {
    res.status(404)
    return (res.json("Page not Found"))
})

app.listen(PORT, () => {
    console.log('server on port', PORT)
});