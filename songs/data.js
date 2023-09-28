let data = [
    {id:1, genre_id:"0", name:"Gangnam style", date_published:Date(1/2/2022)}, 
    {id:2, genre_id:"0", name:"song", date_published:Date(20/12/2022)}, 
]

exports.getAll = () => {
    return data.map(g=>{return{"id": g.id, "name": g.name}})
}

exports.getById = (id) => {
    return data.find((thing) => thing.id == parseInt(id))
}

exports.create = (newSong) => {
    const newId = Math.max(...data.map((thing) => thing.id)) + 1
    newSong.id = newId
    data.push(newSong)
    return newSong
}