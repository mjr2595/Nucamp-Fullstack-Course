const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    campsites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Campsite",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);

/*
A typical favorite document in the DB...

{
    user: c87234p8ybc8bcbojfnw;ejnjd,
    campsites: [76g2fo8ybci76b2ce4, 8y43fo8ybq38ocybqec, o8yb38yfb8yebce, o8y3r8ybco8ybec]
}

How we receive favorites...
    ... on the "/favorites" route

    [{"_id": "76g2fo8ybci76b2ce4"}, {"_id": "8y43fo8ybq38ocybqec"}, {"_id": "o8yb38yfb8yebce"}, ...]

    ... on the "/favorites/:favoriteId" route

    "o8yb38yfb8yebce"

    localhost:3000/favorites/o8yb38yfb8yebce
*/
