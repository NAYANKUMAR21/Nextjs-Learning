require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    bal: { type: Number, default: 500 },
  },
  { versionKey: false },
);
const userModel = mongoose.model("user", userSchema);
const connect = async () => {
  return mongoose.connect(process.env.URI);
};
app.use(express.json());
app.get("/", async (req, res) => {
  let data = await userModel.find({});
  return res.status(200).send({ message: "backend setup is ready", data });
});

app.post("/addUser", async (req, res) => {
  console.log(req.body.Name);
  await userModel.create({
    name: req.body.Name,
  });

  return res.status(201).send({ message: "User created" });
});

app.post("/trans", async (req, res) => {
  const client = new MongoClient(process.env.URI);
  await client.connect();
  const session = client.startSession();
  try {
    // Start a transaction
    session.startTransaction();

    const db = client.db("Trans");
    const collection = db.collection("users");

    // Perform multiple operations in the transaction
    await collection.updateOne(
      { name: "XYZ" },
      { $inc: { bal: -100 } },
      { session },
    );
    await collection.updateOne(
      { name: "123" },
      {
        $inc: { bal: 100 },
      },
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    console.log("Transaction committed successfully");
    res.status(200).send({ message: "Transct Completed" });
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    console.error("Error during transaction:", error);
    res
      .status(200)
      .send({ message: "transcation did not happen", error: error.message });
  } finally {
    await client.close();
    res.status(200).send({ message: "Finally Transcat Completed" });
  }
});

app.get("/html", (req, res) => {
  return res.status(200).sendFile(__dirname, "index.html");
});
app.listen(8080, async () => {
  await connect();
  console.log("http://localhost:8080");
});
