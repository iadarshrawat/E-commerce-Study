import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors'
import path from 'path'
import  {fileURLToPath} from 'url'

// configure env
dotenv.config(); // in our case it is in root so no need to give path otherwise give path inside brakets

// database config
connectDB();

// es module 5
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// rest object
const app  = express();


// middelware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use(express.static(path.join(__dirname, './client/build/')))

// console.log(path.join(__dirname, ));

// rest api
// app.get('/', (req, res)=>{
//     res.send({
//         message:'WelCome to my website'
//     })
// })

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`server is runnig on ${process.env.DEV_MODE} port ${PORT}`)
})
