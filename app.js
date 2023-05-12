const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const date=require(__dirname+"/date.js");
console.log(date.getDate());


const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/bankDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log("connected to bankDB");
  })
  .catch((err) => console.error(err));

//schema for user
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  balance: Number,
});



//make model of user
const User = mongoose.model("User", userSchema);




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



//if user collectio is empty
User.find().then((foundItems) => {
  if (foundItems.length == 0) {
    User.insertMany(userData)
    .then(()=>console.log("inserted dummy data in User collection"))
    .catch((err)=>console.error(err));
  }
})
.catch((err)=>console.error(err));

//transaction schema
const transactionSchema=new mongoose.Schema({
  sender:String,
  reciever:String,
  amount:Number,
  date:String,
});
//make model of transaction
const Transaction=mongoose.model("Transaction",transactionSchema);
//dummy data for transaction
const t1=new Transaction({
  sender:"Atul kumar",
  reciever:"Alok kumar",
  amount:1000,
  date:date.getDate()
  
});
const t2=new Transaction({
  sender:"Chandan kumar",
  reciever:"Alok kumar",
  amount:900,
  date:date.getDate()
});
const t3=new Transaction({
  sender:"Pranav kumar",
  reciever:"Alok kumar",
  amount:1000,
  date:date.getDate()
});
const t4=new Transaction({
  sender:"Sushant kumar",
  reciever:"Harsh kumar",
  amount:1200,
  date:date.getDate()
});
const t5=new Transaction({
  sender:"Atul kumar",
  reciever:"Pranav kumar",
  amount:1800,
  date:date.getDate()
});
const t6=new Transaction({
  sender:"Ashwani kumar",
  reciever:"Subodh kumar",
  amount:8762,
  date:date.getDate()
});
const t7=new Transaction({
  sender:"Harsh kumar",
  reciever:"Alok kumar",
  amount:900,
  date:date.getDate()
});
const transactionData=[t1,t2,t3,t4,t5,t6,t7];
//if transaction collection is empty
Transaction.find().then((foundItems) => {
  if (foundItems.length == 0) {
    Transaction.insertMany(transactionData)
    .then(()=>console.log("inserted dummy data in Transaction collection"))
    .catch((err)=>console.error(err));
  }
})
.catch((err)=>console.error(err));



app.get("/",function(req,res){
  res.render("home");
});

app.get("/customerlist",function(req,res){
  User.find()
  .then((foundUsers)=>{
    res.render("customerlist",{customers:foundUsers,i:1});
  })
  .catch((err)=>console.error(err));
  
});
app.get("/transaction",function(req,res){
  Transaction.find()
  .then((foundTransaction)=>{
    res.render("transaction",{transactions:foundTransaction,i:1});
  })
  .catch((err)=>console.error(err));
  
});

app.get("/contact",function(req,res){
  res.render("contact");
})





app.listen(3000,function(){
  console.log("server started at port 3000");
})