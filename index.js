const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1tyqf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    //all colletction
    const studentsCollection = client.db("hellwettask").collection("students");

    // all student list
    app.get("/students", async (req, res) => {
      const query = {};
      const cursor = studentsCollection.find(query);
      const allStudent = await cursor.toArray(cursor);
      res.send(allStudent);
    });

    //load single student
    app.get("/student", async (req, res) => {
      const studentId = req.query.id;
      const studentSession = req.query.session;
      const que = { id: Number(studentId), session: studentSession };
      const oneStudent = await studentsCollection.findOne(que);
      res.send(oneStudent);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hellwet Task");
});

app.listen(port, () => {
  console.log("Hellwet Task Connected", port);
});
