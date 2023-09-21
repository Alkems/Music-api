const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")

const artists = [
    {id:1, name:"Alkem", country:"Estonia"}, 
    {id:2, name:"Jadeci", country:"USA"},
    {id:3, name:"Kanye West", country:"USA"},
    {id:4, name:"Island Boys", country:"USA"},
]

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

app.get("/artists", (req,res)=>{
    res.send(artists)
})

app.get("/artists/:id", (req, res) => {
    if (typeof artists[req.params.id - 1] === "undefined") {
        return res.status(404).send({error: "Artist not found!"})
    }
})

app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})