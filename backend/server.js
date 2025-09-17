import { configDotenv } from "dotenv";
import app from "./src/app.js";

configDotenv()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('server started at 3000')
})
