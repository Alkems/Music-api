require("dotenv").config()
const { create } = require("domain")
const express = require("express")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
//const swaggerDocument = require("./docs/swagger.json")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")


let artists = require("./artists/data")
let songs = require("./songs/data")

app.use(express.json())

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

require("./routes/artistRoutes")(app)

app.listen(port, ()=> {
    require("./db").sync().then(console.log("IT GOT SYNCED! \n"))
    .catch((error)=>console.log("Error:"+error))
    console.log(`API up at: http://localhost:${port}`);
})