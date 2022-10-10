const { MongoClient } = require("mongodb");
const http = require("http");
const { assert } = require("console");
// Connection URI
const uri = "mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    let fruits = [
      {
        name: "Apple",
        score: 9,
        review: "Hallo",
      },
      {
        name: "Orange",
        score: 9,
        review: "Hallo",
      },
      {
        name: "Banana",
        score: 9,
        review: "Hallo",
      },
    ];
    const collection = client.db("fruitsdb").collection("fruits");

    const insertresult = await collection.insertMany(fruits);

    const result = await collection.find({ name: "Apple" }).toArray();

    const deleted = await collection.deleteMany({});

    console.log(result);
    console.log(insertresult);
    console.log(deleted);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
