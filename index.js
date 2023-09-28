const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
//const swaggerDocument = require("./docs/swagger.json")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
let artists = require("./artists/data")
let songs = require("./songs/data")

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

app.post('/artists',(req,res) => {
    artists.push({
        id: artists.length + 1,
        name: req.body.name,
        country: req.body.country
    })

    res.end()
})

app.get("/songs", (req,res)=>{
    res.send(songs.getAll())
})

app.get("/songs/:id", (req,res)=>{
    const foundThing = songs.getById(req.params.id)
    if(foundThing === undefined){
        return res.status(404).send({error: 'Song not found'})
    }
    
    res.send(songs.getById(req.params.id))
})

app.post('/songs',(req,res) => {
    songs.push({
        id: songs.length + 1,
        genre_id: req.body.genre_id,
        name: req.body.name,
        date_publised: req.body.date_publised
    })

    res.end()
})


app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})