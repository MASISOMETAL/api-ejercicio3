import express from "express"

const path = require("path")
const app = express();

app.use(express.json());

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.get("/api/getinfo", (req, res) => {
    const url = "https://627303496b04786a09002b27.mockapi.io/mock/sucursales"
    const option = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }

    try {
        fetch(url, option)
            .then((responde) => responde.json())
            .then((data) => onHandleInfo(data))
    } catch (error) {
        res.send("Ocurrio un error")
    }

    const onHandleInfo = (data) => {
        
        // tomando cantidad de hombres
        const male = data.filter((item)=> item.genero === "male" )
        const cantMale = male.length.toString()
        // tomando cantidad de mujeres
        const female = data.filter((item)=> item.genero === "female" )
        const cantFemale = female.length.toString()
        //tomando todos los paises y sacando repetidos
        const onlyPaises = data.map((item)=> item.pais)
        const paises = onlyPaises.filter((item, index) => {return onlyPaises.indexOf(item) === index;})
  
        res.send({
            hombres: cantMale,
            mujeres: cantFemale,
            paises: paises
        })
    }

});

const port = process.env.port || 3300;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`)); 

