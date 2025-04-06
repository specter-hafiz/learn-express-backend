const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      // specifying the model name to use for the reference
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  // we get the createdAt and updatedAt fields automatically
  // by setting the timestamps option to true
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
