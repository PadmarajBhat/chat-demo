const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./route');


//db connection
mongoose.connect('mongodb://127.0.0.1:27017/chatMessages', {
  userMongoClient :true
});
mongoose.connection.on("connected", () => {
      console.log("mongoDB connected !!!")
  });
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//startin the app at port 3000
const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use("/", router);


app.listen(PORT, () => {
  console.log("Server started at port :" + PORT);
});
