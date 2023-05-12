const mongoose = require("mongoose");

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

//make model
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


User.find().then((foundItems) => {
  if (foundItems.length == 0) {
    User.insertMany(userData)
    .then(()=>console.log("inserted dummy data"))
    .catch((err)=>console.error(err));
  }
})
.catch((err)=>console.error(err));

