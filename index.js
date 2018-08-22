const express = require('express')
const app = express()
const socket = require('socket.io')
const mongocleint = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/dataChat';
const dbName = 'dataChat';
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
 // .get('/', (req, res) => res.render('pages/index'))
  
 app.use(express.static('public'));

  app.get('/', function (req,res) {
    //console.log('connected');
    res.sendFile(__dirname + '/public/index.html');
     
 });
const servsr = app.listen(process.env.PORT || 5000 ,function (err) {
  if(err)
  console.log('error');
  else{
      console.log('connected');
      
  } 
});

const io = socket(servsr);

io.on('connection', function (cleint) {
    
  console.log('connection estblished ',cleint.id);
 

  cleint.on('chat', function (data) {
    
    io.emit('chatt', data);
  
});

cleint.on('typing', function (data) {
  cleint.broadcast.emit('typing', data);
});
});
