const app = require("express").Router();
const { getPosts } = require("../controller/posts.controller");
const { getUsers } = require("../controller/user.controller");
const mongoose = require("mongoose");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

app.get("/posts", getPosts);
app.get("/users", getUsers);

  const conn = require('../database/index');
  let gfs;
  
  conn.once('open',() => {
    gfs = Grid(conn.db);
    gfs.collection('fs');
  })

app.get('/avatar/:fileid',(req,res, next) => {
 
  gfs.collection('fs').findOne({ filename:req.params.fileid}, (err, file)=>{
      if(!file || file.length === 0){
          return res.status(404).json({
              err: 'No files exist'
          })
      }
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
          return res.status(200);
  })

})

module.exports = app;
