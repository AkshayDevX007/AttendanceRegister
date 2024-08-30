import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  unitName: String,
  attendance: [
    {
      year: Number,
      totalPercentage: Number,
    },
  ],
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
