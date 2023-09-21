const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

app.get("/artists", (req,res)=>{
    res.send([
        {id:1, name:"Alkem", country:"Estonia"}, 
        {id:2, name:"Jadeci", country:"USA"}, 
    ])
})

app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})