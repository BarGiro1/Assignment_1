const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
     type: String,
      required: true 
    },
  content:
   { type: String, 
    required: true
 },
  sender: { type: String
    , required: true 
  },
  createdAt: { type: Date,
     default: Date.now
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mongoose.model("Post", postSchema);
