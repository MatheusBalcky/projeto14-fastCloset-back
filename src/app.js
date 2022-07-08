import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv'; dotenv.config()
import routes from './routes/routes.js'


const app = express();
app.use(express.json(), cors());

app.use(routes);


app.listen(5000, console.log("Server running on port " + 5000));