import  { Express } from "express";
import todoRoutes from "./routes";
var cors = require('cors');
var express = require('express');
var mongoose = require('mongoose');


const app: Express = express();
const PORT: string | number = process.env.PORT || 5000

app.use(cors())
app.use(todoRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const options = {userNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)
mongoose.connect(uri,options)
mongoose.then(()=>
app.listen(PORT,() =>console.log('server is running'))
).catch(err=>{
    throw err
})

