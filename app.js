  
  // Author :- Atul kumar
  // Intern at The Sparks Foundation 


const express = require("express");
//hadle data from form
const bodyParser = require("body-parser");
//for connecting to database
const mongoose = require("mongoose");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
//for capitalize user name after singup
const _ = require("lodash");
const private=require(__dirname+"/private.js");

const app = express();
//for checking the form is submitted
let result = false;
let exits = false;
let lowamount = false;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const password=private.password;
// mongoose
//   .connect("mongodb://localhost:27017/bankDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(function () {
//     console.log("connected to bankDB");
//   })
//   .catch((err) => console.error(err));

//connecting database with database name bankDB
(async function() {
  try {
    await mongoose.connect(`mongodb+srv://919atul:${password}@cluster0.iz4lpfy.mongodb.net/bankDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to bankDB");
  } catch (err) {
    console.error(err);
  }
})();


//schema for user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  balance: Number,
});

//make model of user
const User = mongoose.model("User", userSchema);

//creating dummy data for Users
const user1 = new User({
  name: "Atul kumar",
  email: "919atul@gmail.com",
  balance: 3000,
});

const user2 = new User({
  name: "Alok kumar",
  email: "919alok@gmail.com",
  balance: 6700,
});

const user3 = new User({
  name: "Chandan kumar",
  email: "919chandan@gmail.com",
  balance: 3800,
});

const user4 = new User({
  name: "Chandrama kumar",
  email: "chandrama123@gmail.com",
  balance: 1200,
});

const user5 = new User({
  name: "Ankita kumari",
  email: "kuankita2005@gmail.com",
  balance: 3000,
});

const user6 = new User({
  name: "Subodh kumar",
  email: "subodhkumar6631@gmail.com",
  balance: 3900,
});

const user7 = new User({
  name: "Ashwani kumar",
  email: "ashwanikumarsonu123@gmail.com",
  balance: 3000,
});

const user8 = new User({
  name: "Harsh kumar",
  email: "harsh7683@gmail.com",
  balance: 1000,
});

const user9 = new User({
  name: "Pranav kumar",
  email: "pranavkumar7373@gmail.com",
  balance: 9800,
});

const user10 = new User({
  name: "Sushant kumar",
  email: "shushant33343@gmail.com",
  balance: 6700,
});

//made array of users 
const userData = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
];

//if user collection is empty,then insert dummy data
User.find()
  .then((foundItems) => {
    if (foundItems.length == 0) {
      User.insertMany(userData)
        .then(() => console.log("inserted dummy data in User collection"))
        .catch((err) => console.error(err));
    }
  })
  .catch((err) => console.error(err));

//transaction schema
const transactionSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  amount: Number,
  date: String,
});
//make model of transaction
const Transaction = mongoose.model("Transaction", transactionSchema);
//dummy data for transaction
const t1 = new Transaction({
  sender: "Atul kumar",
  receiver: "Alok kumar",
  amount: 1000,
  date: date.getDate(),
});
const t2 = new Transaction({
  sender: "Chandan kumar",
  receiver: "Alok kumar",
  amount: 900,
  date: date.getDate(),
});
const t3 = new Transaction({
  sender: "Pranav kumar",
  receiver: "Alok kumar",
  amount: 1000,
  date: date.getDate(),
});
const t4 = new Transaction({
  sender: "Sushant kumar",
  receiver: "Harsh kumar",
  amount: 1200,
  date: date.getDate(),
});
const t5 = new Transaction({
  sender: "Atul kumar",
  receiver: "Pranav kumar",
  amount: 1800,
  date: date.getDate(),
});
const t6 = new Transaction({
  sender: "Ashwani kumar",
  receiver: "Subodh kumar",
  amount: 8762,
  date: date.getDate(),
});
const t7 = new Transaction({
  sender: "Harsh kumar",
  receiver: "Alok kumar",
  amount: 900,
  date: date.getDate(),
});
const transactionData = [t1, t2, t3, t4, t5, t6, t7];
//if transaction collection is empty,insert dummy transactions
Transaction.find()
  .then((foundItems) => {
    if (foundItems.length == 0) {
      Transaction.insertMany(transactionData)
        .then(() =>
          console.log("inserted dummy data in Transaction collection")
        )
        .catch((err) => console.error(err));
    }
  })
  .catch((err) => console.error(err));


//home page render
app.get("/", function (req, res) {
  res.render("home");
});

//customerlist page render,with customer name
app.get("/customerlist", function (req, res) {
  User.find()
    .then((foundUsers) => {
      //if new user register then this work
      if (result === true) {
        result = false;
        res.render("customerlist", {
          customers: foundUsers,
          i: 1,
          message: "welcome to spark foundation bank",
        });
      }
      // if user already present ,then directly goes to customerlist page with message
      
       else if (exits === true) {
        exits = false;
        res.render("customerlist", {
          customers: foundUsers,
          i: 1,
          message: "user already exist!",
        });
      } else if (lowamount === true) {
        lowamount = false;
        res.render("customerlist", {
          customers: foundUsers,
          i: 1,
          message: "Not present required money",
        });
      } else {
        res.render("customerlist", {
          customers: foundUsers,
          i: 1,
          message: null,
        });
      }
    })
    .catch((err) => console.error(err));
});

//render transaction page
app.get("/transaction", function (req, res) {
  Transaction.find()
    .then((foundTransaction) => {
      res.render("transaction", { transactions: foundTransaction, i: 1 });
    })
    .catch((err) => console.error(err));
});
//render contact page
app.get("/contact", function (req, res) {
  res.render("contact");
});

//if new user sign up then handle data and insrt in db
app.post("/", function (req, res) {
  const user = new User({
    name: _.capitalize(req.body.name),
    email: req.body.email,
    balance: req.body.balance,
  });
  // console.log(user);
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        user
          .save()
          .then(() => console.log("registered new user."))
          .catch((err) => console.error(err));
        User.find()
          .then((foundUsers) => {
            result = true;
            res.redirect("/customerlist");
          })
          .catch((err) => console.error(err));
      } else {
        console.log("user exits");
        User.find()
          .then((foundUsers) => {
            exits = true;
            res.redirect("/customerlist");
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
});

app.post("/customerlist", async function (req, res) {
  // //make new trnsaction
  // var senderBalance;
  // var receiverBalance;
  // //finding sender data
  // var amount=parseInt(req.body.amount);
  // // console.log(typeof(amount));

  // User.findOne({ name: req.body.sender })
  //   .then((foundUser) => {
  //     // if(foundUser)
  //     // console.log("user in  founderuserj");
  //     // console.log(typeof(foundUser.balance));
  //     // console.log(foundUser.balance);
  //     if (foundUser.balance >=amount) {
  //       // console.log("user exits");
  //       const transaction = new Transaction({
  //         sender: req.body.sender,
  //         receiver: req.body.receiver,
  //         amount: amount,
  //         date: date.getDate(),
  //       });
  //       transaction
  //         .save()
  //         .then(() => console.log("transaction successfull"))
  //         .catch((err) => console.error(err));
  //       senderBalance = foundUser.balance - amount;

  //     } else {
  //       lowamount = true;
  //       // console.log("user not exits");
  //       console.log("balance insuffiecent");
  //       res.redirect("/customerlist");
  //     }
  //   })
  //   .catch((err) => console.error(err));

  // //finding receiver data
  // User.findOne({ name: req.body.receiver })
  //   .then((foundUser) => {
  //     receiverBalance = foundUser.balance + amount;
  //     console.log("updated");
  //   })
  //   .catch((err) => console.error(err));

  //   console.log(receiverBalance);
  //   console.log(senderBalance);

  // //updating sender data
  // User.updateOne({name:req.body.sender},{
  //   $set:{
  //     balance:senderBalance,
  //   }
  // });

  // //updaing receiver data
  // User.updateOne({name:req.body.receiver},{
  //   $set:{
  //     balance:receiverBalance,
  //   }
  // });

  // console.log(senderBalance)
  // console.log(receiverBalance)
  // res.redirect("/customerlist");

  try {
    const amount = parseInt(req.body.amount);

    // Finding sender data
    const foundSender = await User.findOne({ name: req.body.sender });
    if (!foundSender || foundSender.balance <= amount) {
      console.log("Sender not found or balance insufficient");
      lowamount = true;
      res.redirect("/customerlist");
      return;
    }

    // Finding receiver data
    const foundReceiver = await User.findOne({ name: req.body.receiver });
    if (!foundReceiver) {
      console.log("Receiver not found");
      res.redirect("/customerlist");
      return;
    }

    // Create new transaction
    const transaction = new Transaction({
      sender: req.body.sender,
      receiver: req.body.receiver,
      amount: amount,
      date: date.getDate(),
    });
    await transaction.save();
    console.log("Transaction successful");

    // Update sender balance
    const senderBalance = foundSender.balance - amount;
    await User.updateOne(
      { name: req.body.sender },
      { $set: { balance: senderBalance } }
    );

    // Update receiver balance
    const receiverBalance = foundReceiver.balance + amount;
    await User.updateOne(
      { name: req.body.receiver },
      { $set: { balance: receiverBalance } }
    );

    console.log(`Sender balance updated to ${senderBalance}`);
    console.log(`Receiver balance updated to ${receiverBalance}`);
    res.redirect("/customerlist");
  } catch (err) {
    console.error(err);
    res.redirect("/customerlist");
  }
});
//check for server is listen or not
app.listen(3000 || process.env.PORT, function () {
  console.log("server started at port 3000");
});
