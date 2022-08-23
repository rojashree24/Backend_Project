const express=require('express');
const expressLayout=require('express-ejs-layouts')
const mongoose=require('mongoose');
const dotenv=require('dotenv')

const indexRouter=require('./routes/index.js')//importing
const app=express();
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));


mongoose.connect("mongodb+srv://Rojashree:Rojashree@cluster0.jasmsbk.mongodb.net/?retryWrites=true&w=majority");
const db=mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=> console.log('connected to DB'));

app.use('/',indexRouter);

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Running in the port ${PORT}`);
})