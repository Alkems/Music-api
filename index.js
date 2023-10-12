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
    if (!req.body.name || !req.body.country) {
        return res.status(400).send({error: "One or all required parameters are missing"})
    }

    const createdArtist = artists.create({
        name: req.body.name,
        country: req.body.country
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${createdArtist.id}`)
        .send(createdArtist)
})

function getBaseurl (request) {
    return (request.connection && request.connection.encrypted ? "https" : "http") + "://" + request.headers.host
}

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
    if (!req.body.name || !req.body.date_published) {
        return res.status(400).send({error: "One or all required parameters are missing"})
    }

    const createdSong = songs.create({
        name: req.body.name,
        genre_id: req.body.genre_id,
        date_published: Date(req.body.date_published)
    })

    res.status(201)
        .location(`${getBaseurl(req)}/songs/${createdSong.id}`)
        .send(createdSong)
})




app.listen(port, ()=> {
    require("./db").sync().then(console.log("syncronized"))
    .catch((error)=>console.log("Error:"+error))
    console.log(`API up at: http://localhost:${port}`);
})