const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String }, 
  googleId: { type: String }, 
  phone: { type: String },
  profilePicture: { type: String },
  role: { type: String, enum: ["student", "professional", "college_student", "school_student"], default: "student" },
  skills: [{ type: String }],
  interests: [{ type: String }],
},{timestamps: true});


UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = async function () {
  return jwt.sign({
    id: this._id,
  }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;