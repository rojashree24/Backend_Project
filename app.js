// if(process.env.NODE_ENV!=='production'){
//     require('dotenv').load()
// }
const express=require('express');
const expressLayout=require('express-ejs-layouts')
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const bodyParser=require('body-parser');

const indexRouter=require('./routes/index.js')//importing
const authorRouter=require('./routes/authors.js');
// const addRouter=require('./routes/add.js')

const app=express();
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false,limit:'10mb'}))

const database=process.env.DB_URL;
// console.log(database);
mongoose.connect(database);
// console.log(database);
const db=mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=> console.log('connected to DB'));

app.use('/',indexRouter);
app.use('/authors',authorRouter);
// app.use('/',addRouter);


const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Running in the port ${PORT}`);
})