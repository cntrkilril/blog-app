import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {sequelize} from "./database/database.js";
import router from "./router/index.js";
import path from "path"
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const app = express()

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

console.log(__dirname)

app.get('/',(req, res) => {
    res.sendFile( path.resolve(__dirname, './public/index.html'))
})

app.use(express.static("public"));

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
))
app.use('/api', router)
app.use('/media', express.static('media'));



sequelize.sync().then(() => console.log("DB OK")).catch((e) => console.log(e))

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`SERVER OK on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()