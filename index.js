import express from "express"
import path from "path"
import { fileURLToPath } from 'url'
import axios from 'axios';
import cors from "cors"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const corsOptions = {
    origin: '*', // Sustituye con el dominio que deseas permitir
    optionsSuccessStatus: 200 // Algunos navegadores requieren esto para aceptar la respuesta CORS
  };

app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/api/getinfo", (req, res) => {
    const url = "https://627303496b04786a09002b27.mockapi.io/mock/sucursales"

    const onFetch = async () => {
        try {
            const response = await axios.get(url)
            onHandleInfo(response.data)
        } catch (error) {
            
        }
    }

    onFetch()

    const onHandleInfo = (data) => {

        // tomando cantidad de hombres
        const male = data.filter((item) => item.genero === "male")
        const cantMale = male.length.toString()
        // tomando cantidad de mujeres
        const female = data.filter((item) => item.genero === "female")
        const cantFemale = female.length.toString()
        //tomando todos los paises y sacando repetidos
        const onlyPaises = data.map((item) => item.pais)
        const paises = onlyPaises.filter((item, index) => { return onlyPaises.indexOf(item) === index; })

        res.send({
            hombres: cantMale,
            mujeres: cantFemale,
            paises: paises
        })
    }

});

const port = process.env.port || 3300;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));

