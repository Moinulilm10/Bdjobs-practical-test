const express = require("express");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://book:Akib100@cluster0.06xcoia.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(express.json());


async function run() {
    try {
        await client.connect();

        console.log("database connection established...");

        const database = client.db("book-manage");
        const myBook = database.collection("books");

      app.post('/books', async (req, res) => {
            const addDetails = req.body;
            console.log('hit the post')
            const result = await myBook.insertOne(addDetails);
            res.json(result);
        })
    } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
