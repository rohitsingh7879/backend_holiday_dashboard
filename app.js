require("dotenv").config();
const express = require('express');
const mongoose  = require('mongoose')
const cors = require('cors');
const database = require('./config/database');
const routes = require('./app/Http/routes');

const app = express()
app.use(cors({
    origin: '*'
}))

// Increase the size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


mongoose.connect(database.mongodb.uri,{
    useUnifiedTopology: true
}).then(()=>{
    console.log("Mongodb is connected...")
}).catch((err)=>{
    console.log("Mongodb is not connected...",err)
})



app.use('/holiday/',routes)
app.listen(process.env.PORT,()=>{
    console.log(`Server is started on Port ${process.env.PORT}`);
})

app.get('/holiday_dashboard_health', (req, res) => {
    res.status(200).json({ message: "Working", data: "" , success : true , status : 200 });
});

app.use((req, res, next) => {
    res.status(404).json({ message: "Page not Found", data: "" , success : true , status : 404 });
})
