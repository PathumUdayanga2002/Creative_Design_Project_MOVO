const mongoose = require("mongoose");
const bycript = require("bcrypt");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["admin", "presenter"] },
});

//hashed password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bycript.hash(this.password, 10);
  next();
});

//compare password for login

userSchema.methods.comparePassword = async function (password) {
  return bycript.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
