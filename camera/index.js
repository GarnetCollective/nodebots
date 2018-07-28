var express = require('express');
var app = express();
var PORT = 3000;

var fs = require('fs')
var path = require('path')
var cors = require('cors');

app.use(cors())

var path = path.resolve('./tmp')
app.use("/images", express.static("./tmp"));


app.get('/images', (req,res) => {
  fs.readdir(path, function (err, items) {
    res.send({success:true, images: items})

  });

})


app.listen(PORT, () => console.log(`Listening on ${PORT}`))

