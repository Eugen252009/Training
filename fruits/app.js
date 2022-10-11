const mongoose = require("mongoose");
// Connection URI
const uri = "mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
mongoose.connect("mongodb://localhost:27017/fruitsdb");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Why no Name?"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});
const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Why no Name?"],
  },
 age:Number,
 favoriteFruit:fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const People = mongoose.model("people", peopleSchema);

// const fruit = new Fruit({
//   name: "Mango",
//   rating: 9,
//   review: "Nice one",
// });


const people = new People({
  name: "John",
  age:37,
  // favoriteFruit:{name:"Mango"}
});

// fruit.save();
// people.save();

People.updateOne({name:"John"},{favoriteFruit:mango},(err)=>{
if (err) {
  console.log(err);
}else{
  console.log("NICE ONE!");
}
});



// Fruit.updateOne(
//   { _id: "6345b0390535ce156ce0fe8f" },
//   { name: "Peach" },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully Updated!");
//     }
//   }
// );
// Fruit.deleteMany({ name: "Apple" }, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Success!");
//   }
//    mongoose.connection.close();
// });
