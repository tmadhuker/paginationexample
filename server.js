const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { paginatedData } = require("./middleware");
const users = require("./users");

mongoose.connect(
  "mongodb://madhuker:madhuker@cluster0-shard-00-00.nsnrk.mongodb.net:27017,cluster0-shard-00-01.nsnrk.mongodb.net:27017,cluster0-shard-00-02.nsnrk.mongodb.net:27017/test?ssl=true&replicaSet=atlas-kb06z8-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once("open", async () => {
  if (await users.countDocuments().exec()) return;

  Promise.all([
    users.create({
      name: "User 1 ",
      UserRole: "Supervisor",
      Phone: "123456789",
      Availability: "no",
      Department: "Health",
    }),
    users.create({
      name: "User 2 ",
      UserRole: "Supervisor",
      Phone: "0987654321",
      Availability: "yes",
      Department: "Garden",
    }),
    users.create({
      name: "User 3 ",
      UserRole: "Worker",
      Phone: "8888888888",
      Availability: "yes",
      Department: "Health",
    }),
    users.create({
      name: "User 4 ",
      UserRole: "leader",
      Phone: "8888888888",
      Availability: "yes",
      Department: "Health",
    }),
    users.create({
      name: "User 5 ",
      UserRole: "Worker",
      Phone: "8888888810",
      Availability: "no",
      Department: "fire",
    }),
    users.create({
      name: "User 6 ",
      UserRole: "Worker",
      Phone: "8888888811",
      Availability: "yes",
      Department: "garden",
    }),
    users.create({
      name: "User 7 ",
      UserRole: "Worker",
      Phone: "8888888812",
      Availability: "no",
      Department: "Health",
    }),
    users.create({
      name: "User 8 ",
      UserRole: "supervisor",
      Phone: "8888888813",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 9 ",
      UserRole: "leader",
      Phone: "8888888814",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 10 ",
      UserRole: "Worker",
      Phone: "8888888815",
      Availability: "no",
      Department: "Health",
    }),

    users.create({
      name: "User 11 ",
      UserRole: "Supervisor",
      Phone: "1234567816",
      Availability: "no",
      Department: "Health",
    }),
    users.create({
      name: "User 12 ",
      UserRole: "leader",
      Phone: "0987654321",
      Availability: "yes",
      Department: "Garden",
    }),
    users.create({
      name: "User 13 ",
      UserRole: "Worker",
      Phone: "8888888888",
      Availability: "yes",
      Department: "Health",
    }),
    users.create({
      name: "User 14 ",
      UserRole: "leader",
      Phone: "8888888888",
      Availability: "yes",
      Department: "Water",
    }),
    users.create({
      name: "User 15 ",
      UserRole: "Worker",
      Phone: "8888888810",
      Availability: "no",
      Department: "fire",
    }),
    users.create({
      name: "User 16 ",
      UserRole: "leader",
      Phone: "8888888811",
      Availability: "yes",
      Department: "garden",
    }),
    users.create({
      name: "User 17 ",
      UserRole: "Worker",
      Phone: "8888888812",
      Availability: "no",
      Department: "Water",
    }),
    users.create({
      name: "User 18 ",
      UserRole: "supervisor",
      Phone: "8888888823",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 19 ",
      UserRole: "leader",
      Phone: "8888888824",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 20 ",
      UserRole: "Worker",
      Phone: "8888888825",
      Availability: "no",
      Department: "Water",
    }),
    users.create({
      name: "User 21 ",
      UserRole: "Supervisor",
      Phone: "1234567876",
      Availability: "no",
      Department: "Health",
    }),
    users.create({
      name: "User 22 ",
      UserRole: "leader",
      Phone: "0987654321",
      Availability: "yes",
      Department: "Garden",
    }),
    users.create({
      name: "User 23 ",
      UserRole: "Worker",
      Phone: "8888888878",
      Availability: "yes",
      Department: "Health",
    }),
    users.create({
      name: "User 24 ",
      UserRole: "leader",
      Phone: "88888888898",
      Availability: "yes",
      Department: "Water",
    }),
    users.create({
      name: "User 25 ",
      UserRole: "Worker",
      Phone: "8888888830",
      Availability: "no",
      Department: "fire",
    }),
    users.create({
      name: "User 26 ",
      UserRole: "leader",
      Phone: "8888888831",
      Availability: "yes",
      Department: "garden",
    }),
    users.create({
      name: "User 27 ",
      UserRole: "Worker",
      Phone: "8888888832",
      Availability: "no",
      Department: "Water",
    }),
    users.create({
      name: "User 28 ",
      UserRole: "supervisor",
      Phone: "8888888833",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 29 ",
      UserRole: "leader",
      Phone: "8888888834",
      Availability: "yes",
      Department: "Fire",
    }),
    users.create({
      name: "User 30 ",
      UserRole: "Worker",
      Phone: "8888888835",
      Availability: "yes",
      Department: "Water",
    }),
  ]);
});
//Paginate the array
app.get("/users", paginatedData(users), (req, res) => {
  res.json(res.paginatedResult);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`server started on port ${PORT} `));
