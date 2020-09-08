const express = require("express");
const app = express();
const mongoose = require("mongoose");

const users = require("./users");

mongoose.connect(
  "mongodb://madhuker:madhuker@cluster0-shard-00-00.nsnrk.mongodb.net:27017,cluster0-shard-00-01.nsnrk.mongodb.net:27017,cluster0-shard-00-02.nsnrk.mongodb.net:27017/test?ssl=true&replicaSet=atlas-kb06z8-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// const db = mongoose.connection;

// db.once("open", async () => {
//   if (await users.countDocuments().exec()) return;

//   Promise.all([
//     users.create({
//       name: "User 1 ",
//     }),
//     users.create({
//       name: "User 2 ",
//     }),
//     users.create({
//       name: "User 3 ",
//     }),
//     users.create({
//       name: "User 4 ",
//     }),
//     users.create({
//       name: "User 5 ",
//     }),
//     users.create({
//       name: "User 6 ",
//     }),
//     users.create({
//       name: "User 7 ",
//     }),
//     users.create({
//       name: "User 8 ",
//     }),
//     users.create({
//       name: "User 9 ",
//     }),
//     users.create({
//       name: "User 10 ",
//     }),
//     users.create({
//       name: "User 11 ",
//     }),
//     users.create({
//       name: "User 12",
//     }),
//   ]);
// });
//Paginate the array
app.get("/users", paginatedData(users), (req, res) => {
  res.json(res.paginatedResult);
});

function paginatedData(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    try {
      results.result = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult = results;

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
app.listen(3000, () => {
  console.log("app running on 3000");
});
