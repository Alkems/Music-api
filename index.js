const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
//const swaggerDocument = require("./docs/swagger.json")
const yamljs = require('yamljs')
const swaggerDocument = require("./docs/swagger.yaml")
let artists = require("./artists/data")

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

app.get("/artists", (req,res)=>{
    res.send(artists.getAll())
})

app.get("/artists/:id", (req,res)=>{
    const foundThing = artists.getById(req.params.id)
    if(foundThing === undefined){
        return res.status(404).send({error: 'Artist not found'})
    }
    
    res.send(artists.getById(req.params.id))
})


app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})