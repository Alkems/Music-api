require("dotenv").config()
const { create } = require("domain")
const express = require("express")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
//const swaggerDocument = require("./docs/swagger.json")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

app.use(express.json())

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

require("./routes/artistRoutes")(app)
require("./routes/songRoutes")(app)
require("./routes/artistSongRoutes")(app)
require("./routes/genreRoutes")(app)
require("./routes/albumRoutes")(app)
require("./routes/songAlbumRoutes")(app)

app.listen(port, ()=> {
    require("./db").sync().then(console.log("Synchronized succesfully\n"))
    .catch((error)=>console.log("Error:"+error))
    console.log(`API up at: http://localhost:${port}`);
    console.log(process.env.STARTUP_MSG)
})