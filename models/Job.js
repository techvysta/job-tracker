import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    status: {
      type: String,
      default: "Applied",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);


