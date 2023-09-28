const express = require("express")
const app = express()
const port = 8080
const swaggerui = require("swagger-ui-express")
//const swaggerDocument = require("./docs/swagger.json")
const yamljs = require('yamljs')
const swaggerDocument = yamljs.load("./docs/swagger.yaml")
let artists = require("./artists/data")
let songs = require("./songs/data")

app.use(express.json())

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
    artists.create({
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
    songs.create({
        name: res.body.name,
        genre_id: res.body.genre_id,
        date_uploaded: res.body.date_uploaded
    })
    res.end()
})


app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})