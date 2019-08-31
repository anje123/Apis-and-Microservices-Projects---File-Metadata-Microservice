'use strict';

const multer  = require('multer')
const express = require('express');
const cors = require('cors');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse",upload.any(),(req,res)=>{
  try {
    let file = req.files[0]
  res.send({"name":file.originalname,"type":file.mimetype , size:file.size});
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
