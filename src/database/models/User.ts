import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: 'https://lh3.googleusercontent.com/a/ACg8ocJ1s1NsI6_YvDP6FnQ4CGDZjkxaK1vLNyqJXeQ4nFnIarkUGDQ=s96-c',
  }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;