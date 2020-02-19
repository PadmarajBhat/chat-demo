const express = require('express');
const router = express.Router();
const chats = require('./itemSchema');
const dialog = require('./dialogflow');


router.get("/", (req, res, next) => {
  res.json("welcome to home page !!!");
});

router.get("/get_router", (req, res, next) => {
  res.json("get_router called");
});

router.get('/items', (req, res, next) => {
    chats.find({}, (err, items) => {
      if (err) {
        res.json(err);
      }
      else {
        res.json(items);
      }
    });
});

router.post('/item', (req, res, next) => {
  let newItem = new chats({
    user: req.body.user,
    msg: req.body.msg
  });

  newItem.save((err) => {
    if (err) {
      res.json(err);
    }
    else {
      res.json({ status: req.body.user + "added to the db !!!" })
    }
  }); //db save

});//post end

router.post('/talkToAgent', async(req, res, next) => {
  //dialog("gecko-api2");
  console.log("req.body :",req.body['user']);
  let dialogOutput = await dialog.sendTextMessageToDialogFlow(req.body['user'], "1234");
  console.log("dialogOutput is of type", typeof dialogOutput);
  console.log("dialogOutput", Object.keys(dialogOutput));
  console.log("dialogOutput['0']", dialogOutput['0']);
    try {
    
      res.json(dialogOutput['0']['queryResult']['fulfillmentText']);
  }
  catch{
    res.json({ msg: "error occurred" });
  }
  
  //dialog.runSample("gecko-api2");
});


router.put('/item/:user', (req, res, next) => {
  console.log("put method called!!!");
  console.log("req.params.user" + req.params.user);
  console.log("request.body.msg"+req.body.msg);
  chats.update({ user: req.params.user }, { msg: req.body.msg },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }//call back end
  );//update end

}//callback end
);//put end


router.delete("/item/:user", (req, res, next) => {
  chats.remove({ user: req.params.user }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result)
    }
  }); //remove and its callback
}); //delete & its callback end


//router.get('/reports/relocation_data', (req, res, next) => {
//  data = [
//    ['Task', 'Hours per Day'],
//    ['Work', 11],
//    ['Eat', 2.7],
//    ['Commute', 2],
//    ['Watch TV', 2],
//    ['Sleep', 7]
//  ];
//  res.json(data);
//});



module.exports = router;
