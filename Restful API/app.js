const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const BULKDATA = [
  {
    title: "API",
    content:
      "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer.",
  },
  {
    title: "Bootstrap",
    content:
      "This is a framework developed by Twitter that contains pre-made front-end templates for web design",
  },
  {
    title: "DOM",
    content:
      "The Document Object Model is like an API for interacting with our HTML",
  },
];

app
  .route("/articles")
  .get(async (req, res) => {
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const cursor = await articles.find({});
      const articlelocal = await cursor.toArray();
      res.send(articlelocal);
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
  })
  .post(async (req, res) => {
    const title = _.lowerCase(req.body.title);
    const content = _.lowerCase(req.body.content);
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const result = await articles.insertOne({
        name: title,
        content: content,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
    res.send("geht!");
  })
  .delete(async (req, res) => {
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const result = await articles.deleteMany({});
      console.log("Deleted " + result.deletedCount + " documents");
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
    res.send("Keine Fehler");
  });

app
  .route("/articles/:name")
  .get(async (req, res) => {
    const remArticle = _.lowerCase(req.params.name);
    console.log(remArticle);
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const cursor = await articles.findOne({ name: remArticle });
      //   const articlelocal = await cursor.toArray();
      res.send(cursor);
      // console.log(articlelocal);
    } catch (err) {
      console.log(err);
      res.send(err);
    } finally {
      await client.close();
    }
  })
  .put(async (req, res) => {
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const result = await articles.replaceOne(
        { name: _.lowerCase(req.params.name) },
        {
          name: _.lowerCase(req.params.name),
          content: _.lowerCase(req.body.content),
        },
        {}
      );
      res.send(result);
    } finally {
      await client.close();
    }
  }).patch(async(req,res)=>{
    
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const result = await articles.updateOne(
        { name: _.lowerCase(req.body.name)},
        {
          name: _.lowerCase(req.body.name),
          content: _.lowerCase(req.body.content),
        },
        {}
      );
      res.send(result);
    } finally {
      await client.close();
    }
  }).delete(async (req, res) => {
    const client = new MongoClient(uri);
    const articles = client.db("wikiDB").collection("articles");
    try {
      const result = await articles.deleteOne({name:_.lowerCase(req.params.name)});
      console.log("Deleted " + result.deletedCount + " documents");
    } catch (err) {
      console.log(err);
    } finally {
      await client.close();
    }
    res.send("Keine Fehler");
  });

app.listen(3000, (err) => {
  console.log("Server läuft");
});
