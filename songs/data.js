let data = [
    {id:1, name:"Alkem", country:"Estonia"}, 
    {id:2, name:"Jadeci", country:"USA"},
    {id:3, name:"Kanye West", country:"USA"},
    {id:4, name:"Island Boys", country:"USA"},
]

exports.getAll = () => {
    return data.map(g=>{return{"id": g.id, "name": g.name}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}