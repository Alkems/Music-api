require("dotenv").config()
const { create } = require("domain")
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT
const swaggerui = require("swagger-ui-express")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")

app.use("/client", express.static("frontend"))
app.use(express.json())
app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))
app.use("/", express.static("."))

require("./routes/artistRoutes")(app)
require("./routes/songRoutes")(app)
require("./routes/artistSongRoutes")(app)
require("./routes/genreRoutes")(app)
require("./routes/albumRoutes")(app)
require("./routes/songAlbumRoutes")(app)

app.listen(port, async ()=> {
    require("./db").sync()
        .then(console.log("Synchronized succesfully\n"))
        .catch((error)=>console.log("Error:"+error))
    console.log(`API up at: http://localhost:${port}`);
    console.log(process.env.STARTUP_MSG)
})