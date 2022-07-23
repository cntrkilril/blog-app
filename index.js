import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {sequelize} from "./database/database.js";
import router from "./router/index.js";

const PORT = process.env.PORT || 5000;
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
))
app.use('/api', router)
app.use('/media', express.static('./media'));

sequelize.sync({force: true}).then(() => console.log("DB OK")).catch((e) => console.log(e))

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`SERVER OK on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()