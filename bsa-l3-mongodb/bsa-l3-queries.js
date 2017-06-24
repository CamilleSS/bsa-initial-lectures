// Query to display the students with a score > 87% and < 93% of any type of work

db.students.find(
  { scores:
    { $elemMatch:
      { score:
        {
          $gt: 87,
          $lt: 93
        }
      }
    }
  }
).pretty();

// Query to display the students with an exam score > 90%

db.students.aggregate(
  [
    { $unwind: "$scores" },
    { $match:
      {
        "scores.type": "exam",
        "scores.score": { $gt: 90 }
      }
    }
  ]
).pretty();

/*
  Query to update the documents with the field "name": "Dusti Lemmond"
  by adding field "accepted" with the value "true"
*/

db.students.update(
  { name: "Dusti Lemmond" },
  { $set: { accepted: true } },
  { multi: true }
);